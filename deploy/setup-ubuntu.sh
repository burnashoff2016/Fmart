#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

APP_NAME="fmart"
APP_PORT="3000"
APP_USER="${SUDO_USER:-}"
APP_DIR="${REPO_ROOT}"
DOMAIN="_"
NODE_MAJOR="22"
BRANCH="main"
REPO_URL=""
ADMIN_PASSWORD=""
ADMIN_SESSION_SECRET=""

usage() {
  cat <<'EOF'
Usage:
  sudo bash deploy/setup-ubuntu.sh [options]

Options:
  --domain example.com      Domain for nginx server_name. Default: _
  --app-name fmart          systemd service name. Default: fmart
  --app-port 3000           Local port for Next.js. Default: 3000
  --app-user ubuntu         Linux user that will own the app process
  --app-dir /var/www/fmart  Project directory. Default: current repo root
  --repo https://...git     Clone or update the repository before build
  --branch main             Git branch for --repo mode. Default: main
  --node-major 22           Node.js major version to enforce. Default: 22
  --admin-password value    ADMIN_PASSWORD for /admin. Generated if missing
  --session-secret value    ADMIN_SESSION_SECRET. Generated if missing
  --help                    Show this help

Examples:
  sudo bash deploy/setup-ubuntu.sh --domain shop.example.com
  sudo bash deploy/setup-ubuntu.sh --repo git@github.com:org/repo.git --branch main --app-dir /var/www/fmart --app-user ubuntu --domain shop.example.com
EOF
}

log() {
  printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$1"
}

fail() {
  printf 'Error: %s\n' "$1" >&2
  exit 1
}

require_root() {
  if [[ "${EUID}" -ne 0 ]]; then
    fail "run this script with sudo or as root"
  fi
}

parse_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --domain)
        DOMAIN="$2"
        shift 2
        ;;
      --app-name)
        APP_NAME="$2"
        shift 2
        ;;
      --app-port)
        APP_PORT="$2"
        shift 2
        ;;
      --app-user)
        APP_USER="$2"
        shift 2
        ;;
      --app-dir)
        APP_DIR="$2"
        shift 2
        ;;
      --repo)
        REPO_URL="$2"
        shift 2
        ;;
      --branch)
        BRANCH="$2"
        shift 2
        ;;
      --node-major)
        NODE_MAJOR="$2"
        shift 2
        ;;
      --admin-password)
        ADMIN_PASSWORD="$2"
        shift 2
        ;;
      --session-secret)
        ADMIN_SESSION_SECRET="$2"
        shift 2
        ;;
      --help|-h)
        usage
        exit 0
        ;;
      *)
        fail "unknown argument: $1"
        ;;
    esac
  done
}

detect_app_user() {
  if [[ -n "${APP_USER}" && "${APP_USER}" != "root" ]]; then
    return
  fi

  if [[ -d "${APP_DIR}" ]]; then
    local owner
    owner="$(stat -c '%U' "${APP_DIR}")"
    if [[ -n "${owner}" && "${owner}" != "root" ]]; then
      APP_USER="${owner}"
      return
    fi
  fi

  fail "cannot determine app user automatically, pass --app-user <linux-user>"
}

ensure_user_exists() {
  id "${APP_USER}" >/dev/null 2>&1 || fail "linux user '${APP_USER}' does not exist"
}

run_as_app_user() {
  su -s /bin/bash "${APP_USER}" -c "$*"
}

random_secret() {
  openssl rand -base64 32 | tr -d '\n'
}

install_base_packages() {
  log "installing system packages"
  apt-get update -y
  apt-get install -y curl ca-certificates gnupg nginx git build-essential openssl
}

ensure_node() {
  local current_major=""

  if command -v node >/dev/null 2>&1; then
    current_major="$(node -p 'process.versions.node.split(`.`)[0]')"
  fi

  if [[ -n "${current_major}" ]] && (( current_major >= NODE_MAJOR )); then
    log "node.js ${current_major} already installed"
    return
  fi

  log "installing node.js ${NODE_MAJOR}.x"
  install -d -m 0755 /etc/apt/keyrings
  curl -fsSL "https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key" \
    | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  cat >/etc/apt/sources.list.d/nodesource.list <<EOF
deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main
EOF
  apt-get update -y
  apt-get install -y nodejs
}

sync_repo() {
  if [[ -z "${REPO_URL}" ]]; then
    log "using existing project directory ${APP_DIR}"
    [[ -f "${APP_DIR}/package.json" ]] || fail "package.json not found in ${APP_DIR}"
    return
  fi

  log "syncing repository ${REPO_URL}"
  mkdir -p "$(dirname "${APP_DIR}")"

  if [[ -d "${APP_DIR}/.git" ]]; then
    git -C "${APP_DIR}" fetch --all --prune
    git -C "${APP_DIR}" checkout "${BRANCH}"
    git -C "${APP_DIR}" pull --ff-only origin "${BRANCH}"
  else
    rm -rf "${APP_DIR}"
    git clone --depth 1 --branch "${BRANCH}" "${REPO_URL}" "${APP_DIR}"
  fi
}

ensure_app_ownership() {
  log "ensuring app directory ownership"
  chown -R "${APP_USER}:${APP_USER}" "${APP_DIR}"
}

write_runtime_env() {
  log "preparing runtime environment"
  local env_file="${APP_DIR}/.env.production"

  if [[ -f "${env_file}" ]]; then
    ADMIN_PASSWORD="${ADMIN_PASSWORD:-$(grep -E '^ADMIN_PASSWORD=' "${env_file}" | tail -1 | cut -d= -f2- || true)}"
    ADMIN_SESSION_SECRET="${ADMIN_SESSION_SECRET:-$(grep -E '^ADMIN_SESSION_SECRET=' "${env_file}" | tail -1 | cut -d= -f2- || true)}"
  fi

  ADMIN_PASSWORD="${ADMIN_PASSWORD:-$(random_secret)}"
  ADMIN_SESSION_SECRET="${ADMIN_SESSION_SECRET:-$(random_secret)}"

  cat >"${env_file}" <<EOF
ADMIN_PASSWORD=${ADMIN_PASSWORD}
ADMIN_SESSION_SECRET=${ADMIN_SESSION_SECRET}
EOF

  chown "${APP_USER}:${APP_USER}" "${env_file}"
  chmod 600 "${env_file}"
}

prepare_runtime_dirs() {
  log "preparing writable runtime directories"
  mkdir -p "${APP_DIR}/data" "${APP_DIR}/public/uploads"
  chown -R "${APP_USER}:${APP_USER}" "${APP_DIR}/data" "${APP_DIR}/public/uploads"
}

install_dependencies() {
  log "installing npm dependencies"
  run_as_app_user "cd '${APP_DIR}' && npm ci"
}

build_app() {
  log "building next.js app"
  run_as_app_user "cd '${APP_DIR}' && npm run build"
}

prepare_standalone_assets() {
  log "copying standalone static assets"
  run_as_app_user "cd '${APP_DIR}' && mkdir -p .next/standalone/.next && rm -rf .next/standalone/.next/static .next/standalone/public && cp -R .next/static .next/standalone/.next/static && cp -R public .next/standalone/public"
}

write_systemd_service() {
  log "writing systemd service"
  cat >"/etc/systemd/system/${APP_NAME}.service" <<EOF
[Unit]
Description=${APP_NAME} Next.js application
After=network.target

[Service]
Type=simple
User=${APP_USER}
Group=${APP_USER}
WorkingDirectory=${APP_DIR}
Environment=NODE_ENV=production
Environment=PORT=${APP_PORT}
Environment=HOSTNAME=127.0.0.1
EnvironmentFile=${APP_DIR}/.env.production
ExecStart=/usr/bin/node ${APP_DIR}/.next/standalone/server.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

  systemctl daemon-reload
  systemctl enable "${APP_NAME}.service"
  systemctl restart "${APP_NAME}.service"
}

write_nginx_config() {
  log "writing nginx config"
  cat >"/etc/nginx/sites-available/${APP_NAME}.conf" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    client_max_body_size 25m;

    location / {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

  ln -sfn "/etc/nginx/sites-available/${APP_NAME}.conf" "/etc/nginx/sites-enabled/${APP_NAME}.conf"
  rm -f /etc/nginx/sites-enabled/default
  nginx -t
  systemctl enable nginx
  systemctl restart nginx
}

print_summary() {
  cat <<EOF

Deployment completed.

Service:
  systemctl status ${APP_NAME}.service
  journalctl -u ${APP_NAME}.service -n 100 --no-pager

Nginx:
  nginx -t
  systemctl status nginx

Admin env:
  ${APP_DIR}/.env.production

App URL:
  http://${DOMAIN}
EOF
}

main() {
  parse_args "$@"
  require_root
  detect_app_user
  ensure_user_exists
  install_base_packages
  ensure_node
  sync_repo
  ensure_app_ownership
  write_runtime_env
  prepare_runtime_dirs
  install_dependencies
  build_app
  prepare_standalone_assets
  write_systemd_service
  write_nginx_config
  print_summary
}

main "$@"
