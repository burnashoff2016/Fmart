# Ubuntu deployment

This project supports an idempotent Ubuntu setup script that installs Node.js, nginx, builds the Next.js app, creates a `systemd` service, and prepares the runtime folders used by the FMART admin panel.

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

You can pass explicit admin credentials:

```bash
sudo bash deploy/setup-ubuntu.sh \
  --domain example.com \
  --app-user ubuntu \
  --admin-password 'change-this-password' \
  --session-secret 'change-this-long-random-secret'
```

If they are omitted, the script generates `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in `.env.production`.

## What the script does

1. Installs `curl`, `git`, `nginx`, `build-essential`, and Node.js 22.
2. Clones or updates the repository if `--repo` is provided.
3. Runs `npm ci` and `npm run build`.
4. Copies `.next/static` and `public` into `.next/standalone` for the standalone server.
5. Creates writable `data/` and `public/uploads/` folders for product edits and uploaded images.
6. Creates `.env.production` with admin credentials if it does not already exist.
7. Creates a `systemd` service that starts `.next/standalone/server.js`.
8. Writes nginx config and proxies port `80` to the app on `127.0.0.1:3000`.

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

- The script creates `.env.production` if it does not exist. Keep it out of git and save the generated admin password.
- The admin panel stores product edits in `data/products.json` and uploads in `public/uploads/`; treat these as production data and back them up before replacing the server directory.
- SSL is not configured automatically yet. Add `certbot` after DNS is pointed to the server.
- If you run several websites on one server, pass a unique `--app-name` and `--domain`.
