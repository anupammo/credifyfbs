#!/usr/bin/env bash
#
# deploy.sh — Credify Form Builder: one-command deploy + ops helper (GCP VM).
#
# ┌─ ENVIRONMENT REFERENCE (so you never have to look things up) ──────────────┐
# │ VM (GCP Compute Engine, Ubuntu)                                            │
# │   public IP : 35.255.131.130                                               │
# │   SSH user  : support           (PuTTY session; key is held by PuTTY)      │
# │                                                                            │
# │ Domains / what serves them                                                 │
# │   forms.credifyfast.com   builder + patient fill   nginx (static files)    │
# │   chrome.credifyfast.com  REST API  /api/**         nginx -> Docker :3000  │
# │   login.credifyfast.com   SSO (login / Google OAuth) pm2 process 'credify' │
# │                                                                            │
# │ Folder structure                                                           │
# │   repo (this)    : /home/support/credifyfbs                                │
# │   web root       : /var/www/forms.credifyfast.com   (nginx serves /)       │
# │   docker compose : /home/support/credifyfbs/docker/docker-compose.prod.yml │
# │   nginx vhost    : /etc/nginx/sites-available/forms.credifyfast.com        │
# │   credify-login  : /home/support/credify-login      (separate repo, pm2)   │
# │                                                                            │
# │ Docker containers                                                          │
# │   docker-backend-1   image docker-backend   API on host :3000              │
# │   docker-postgres-1  postgres:16-alpine     host :5434 -> container :5432  │
# │                                                                            │
# │ Database                                                                   │
# │   name 'credify'  user 'credify'  in container docker-postgres-1           │
# │   open a shell:  ./deploy.sh db                                            │
# │                                                                            │
# │ SECRETS ARE NOT STORED IN THIS FILE (it lives in git/GitHub). Locations:   │
# │   builder API : /home/support/credifyfbs/backend/.env                      │
# │                 DATABASE_URL · AES_MASTER_KEY · JWT_* · CREDIFY_LOGIN_JWT_SECRET
# │   credify-login: /home/support/credify-login/.env   (JWT_SECRET, OAuth, …)  │
# │   sudo / SSH  : your own account password / your PuTTY key                 │
# └────────────────────────────────────────────────────────────────────────────┘
#
# USAGE
#   ./deploy.sh                  Deploy the current branch (fallback: v4.4)
#   ./deploy.sh v4.3             Deploy a specific branch
#   FORCE_BACKEND=1 ./deploy.sh  Deploy + force an API container rebuild
#   ./deploy.sh status           Show git HEAD + container status
#   ./deploy.sh logs             Tail the API container logs (Ctrl+C to stop)
#   ./deploy.sh db               Open a psql shell on the database
#   ./deploy.sh help             Show this help
#
set -euo pipefail

# ══ CONFIG — edit here if the infrastructure ever moves ══════════════════════
VM_IP="35.255.131.130"
SSH_USER="support"
REPO_DIR="/home/support/credifyfbs"
WEB_ROOT="/var/www/forms.credifyfast.com"
DOCKER_DIR="$REPO_DIR/docker"
COMPOSE_FILE="docker-compose.prod.yml"
NGINX_VHOST="/etc/nginx/sites-available/forms.credifyfast.com"
LOGIN_DIR="/home/support/credify-login"
LOGIN_PM2="credify"
DEFAULT_BRANCH="v4.4"
DOMAIN="forms.credifyfast.com"
API_DOMAIN="chrome.credifyfast.com"
API_CONTAINER="docker-backend-1"
PG_CONTAINER="docker-postgres-1"
DB_NAME="credify"
DB_USER="credify"
DB_HOST_PORT="5434"        # host port; 5432 inside the container
# ═════════════════════════════════════════════════════════════════════════════

usage() { sed -n '2,40p' "$0" | sed 's/^# \{0,1\}//'; }

do_status() {
  cd "$REPO_DIR"
  echo "Repo   : $REPO_DIR"
  echo "Branch : $(git rev-parse --abbrev-ref HEAD)   HEAD: $(git rev-parse --short HEAD)"
  echo "Containers:"
  sudo docker ps --format '  {{.Names}}\t{{.Status}}\t{{.Ports}}' | grep -E "$API_CONTAINER|$PG_CONTAINER" || true
}

do_logs() { sudo docker logs --tail 60 -f "$API_CONTAINER"; }

do_db()   { sudo docker exec -it "$PG_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME"; }

do_deploy() {
  local branch="${1:-}"
  cd "$REPO_DIR"
  [ -z "$branch" ] && branch="$(git rev-parse --abbrev-ref HEAD)"
  [ "$branch" = "HEAD" ] && branch="$DEFAULT_BRANCH"
  echo "==> Deploying branch '$branch'  ($REPO_DIR)"

  # 1) sync repo to the remote (deploy box: discards stray local edits)
  local before after
  before="$(git rev-parse HEAD 2>/dev/null || echo none)"
  git fetch --quiet origin "$branch"
  git checkout -f -q -B "$branch" "origin/$branch"
  after="$(git rev-parse HEAD)"
  if [ "$before" = "$after" ]; then echo "    code unchanged ($after) — re-publishing anyway"; else echo "    $before -> $after"; fi

  # 2) publish the static frontend
  #    app.html is the single source of truth. The live nginx vhost serves '/'
  #    via `index app.html index.html index.htm;`, so copying app.html is enough.
  #    We ALSO (re)assert index.html -> app.html as a belt-and-suspenders fallback
  #    (ln is idempotent + self-heals a fresh box). Don't cp to index.html
  #    separately — that would just write through the symlink back into app.html.
  echo "==> Publishing frontend -> $WEB_ROOT"
  sudo cp app.html "$WEB_ROOT/app.html"
  sudo ln -sfn app.html "$WEB_ROOT/index.html"
  [ -f fill.html ] && sudo cp fill.html "$WEB_ROOT/fill.html"
  [ -d errors ]    && sudo cp errors/404.html errors/403.html errors/50x.html "$WEB_ROOT/"
  for f in favicon.ico icon.png apple-icon.png; do
    [ -f "$f" ] && sudo cp "$f" "$WEB_ROOT/"
  done

  # 3) rebuild the API container only when backend/ changed (or FORCE_BACKEND=1)
  local rebuild=0
  if [ "${FORCE_BACKEND:-0}" = "1" ] || [ "$before" = "none" ]; then rebuild=1
  elif ! git diff --quiet "$before" "$after" -- backend/; then rebuild=1; fi
  if [ "$rebuild" = "1" ]; then
    echo "==> backend/ changed — rebuilding the API container ($API_CONTAINER)"
    ( cd "$DOCKER_DIR" && sudo docker compose -f "$COMPOSE_FILE" up -d --build backend )
    if [ "$before" != "none" ] && ! git diff --quiet "$before" "$after" -- backend/prisma/schema.prisma; then
      echo "    !! prisma/schema.prisma changed — apply the new table SQL manually"
      echo "       (Prisma 7 CLI can't migrate until the datasource url moves to prisma.config.ts)."
    fi
  else
    echo "==> backend/ unchanged — skipping API rebuild"
  fi

  # 4) verify the live origin serves the freshly published file
  echo "==> Verifying live origin (cache-bypassed)..."
  set +e
  local local_md5 served_md5
  local_md5="$(md5sum app.html | awk '{print $1}')"
  served_md5="$(curl -s --resolve "$DOMAIN:443:127.0.0.1" "https://$DOMAIN/" | md5sum | awk '{print $1}')"
  set -e
  if [ "$local_md5" = "$served_md5" ]; then
    echo "    OK — $DOMAIN is serving this exact build."
  else
    echo "    WARNING — served build differs (local=$local_md5 served=$served_md5). Check nginx / web root."
  fi
  echo "==> Done. Hard-refresh the site if your browser cached an older copy."
}

case "${1:-}" in
  status)         do_status ;;
  logs)           do_logs ;;
  db)             do_db ;;
  help|-h|--help) usage ;;
  deploy|"")      do_deploy "" ;;
  *)              do_deploy "$1" ;;   # treat the arg as a branch name
esac
