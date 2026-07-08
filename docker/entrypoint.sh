#!/bin/sh
# Bootstraps the Laravel app on container start, then execs the given command.
set -e

cd /app

# Ensure an environment file exists (fresh clones have none).
if [ ! -f .env ]; then
    cp .env.docker .env
fi

# Ensure the SQLite database file exists before migrating.
mkdir -p database
if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite
fi

# Generate an application key only if one isn't set yet (avoids invalidating
# sessions on every restart).
if ! grep -q '^APP_KEY=base64:' .env; then
    php artisan key:generate --force
fi

# Apply database migrations.
php artisan migrate --force

exec "$@"
