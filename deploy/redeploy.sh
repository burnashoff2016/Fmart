#!/usr/bin/env bash

set -euo pipefail

APP_NAME="${1:-fmart}"
APP_DIR="${2:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"

cd "${APP_DIR}"
npm ci
npm run build
sudo systemctl restart "${APP_NAME}.service"

echo "Redeploy completed for ${APP_NAME}"
