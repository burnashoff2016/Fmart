# Ubuntu deployment

This project now supports an idempotent Ubuntu setup script that installs Node.js, nginx, builds the Next.js app, and creates a `systemd` service.

## Quick start

If the repository is already on the server:

```bash
cd /path/to/fmart_filnal
sudo bash deploy/setup-ubuntu.sh --domain example.com --app-user ubuntu
```

If you want the script to clone the repository itself:

```bash
sudo bash deploy/setup-ubuntu.sh \
  --repo git@github.com:your-org/your-repo.git \
  --branch main \
  --app-dir /var/www/fmart \
  --app-user ubuntu \
  --domain example.com
```

## What the script does

1. Installs `curl`, `git`, `nginx`, `build-essential`, and Node.js 22.
2. Clones or updates the repository if `--repo` is provided.
3. Runs `npm ci` and `npm run build`.
4. Creates a `systemd` service that starts `.next/standalone/server.js`.
5. Writes nginx config and proxies port `80` to the app on `127.0.0.1:3000`.

## After updates

For a quick rebuild and restart on the same server:

```bash
bash deploy/redeploy.sh
```

Or with a custom service name:

```bash
bash deploy/redeploy.sh my-service-name /var/www/fmart
```

## Notes

- The script creates an empty `.env.production` if it does not exist.
- SSL is not configured automatically yet. Add `certbot` after DNS is pointed to the server.
- If you run several websites on one server, pass a unique `--app-name` and `--domain`.
