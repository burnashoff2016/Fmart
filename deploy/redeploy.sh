#!/usr/bin/env bash

set -euo pipefail

APP_NAME="${1:-fmart}"
APP_DIR="${2:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"

cd "${APP_DIR}"
mkdir -p data public/uploads
npm ci
npm run build
mkdir -p .next/standalone/.next
rm -rf .next/standalone/.next/static .next/standalone/public
cp -R .next/static .next/standalone/.next/static
cp -R public .next/standalone/public
sudo systemctl restart "${APP_NAME}.service"

echo "Redeploy completed for ${APP_NAME}"
