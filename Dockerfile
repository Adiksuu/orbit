# syntax=docker/dockerfile:1

# =============================================================================
# Orbit — Laravel + Inertia + React monolith
# Two build targets from one Dockerfile:
#   * php  — the Laravel application (php artisan serve)
#   * node — the Vite dev server (npm run dev, HMR)
# docker-compose runs both as separate services sharing the mounted source.
# =============================================================================

# -----------------------------------------------------------------------------
# PHP / Laravel application
# -----------------------------------------------------------------------------
FROM php:8.5-cli AS php

# System libraries + PHP extensions required by Laravel and SQLite.
RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
        unzip \
        libzip-dev \
        libsqlite3-dev \
        libicu-dev \
        libonig-dev \
    && docker-php-ext-install pdo pdo_sqlite bcmath zip intl mbstring \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Composer (from the official Composer image).
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Install PHP dependencies first for better layer caching. Skip scripts here
# because the application code (and artisan) isn't present yet.
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-interaction --prefer-dist --no-progress

# Now copy the rest of the source and finish the autoloader / package discovery.
COPY . .
RUN composer dump-autoload --optimize

# Entrypoint bootstraps .env, the SQLite file, the app key and migrations.
COPY docker/entrypoint.sh /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint

EXPOSE 8000
ENTRYPOINT ["entrypoint"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

# -----------------------------------------------------------------------------
# Node / Vite dev server
# -----------------------------------------------------------------------------
FROM node:26-alpine AS node
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 5173
# --host makes Vite listen on 0.0.0.0 so it is reachable from the host browser.
CMD ["npm", "run", "dev", "--", "--host"]
