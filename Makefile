.PHONY: setup up dev down build test test-coverage lint type-check logs shell tinker migrate fresh clean npm-install

# Build images and start the full stack (app + vite) in the background.
setup:
	docker compose build --no-cache
	docker compose up -d
	@echo ""
	@echo "  Orbit is running — open the app in your browser:"
	@echo ""
	@echo "    App (Laravel):   http://localhost:8000"
	@echo "    Vite (assets):   http://localhost:5173"
	@echo ""

# Start the stack in the foreground (Ctrl+C to stop).
up dev:
	@echo ""
	@echo "  Orbit is starting — open the app in your browser:"
	@echo ""
	@echo "    App (Laravel):   http://localhost:8000"
	@echo "    Vite (assets):   http://localhost:5173"
	@echo ""
	docker compose up

# Start the stack detached.
up-d:
	docker compose up -d
	@echo ""
	@echo "  Orbit is running (detached) — open the app in your browser:"
	@echo ""
	@echo "    App (Laravel):   http://localhost:8000"
	@echo "    Vite (assets):   http://localhost:5173"
	@echo ""

# Stop the stack.
down:
	docker compose down

# (Re)build the images.
build:
	docker compose build

# Run this after adding/updating/removing an npm package (package.json or
# package-lock.json changed). docker-compose mounts an anonymous volume over
# node_modules in the vite service, so a plain rebuild/restart keeps the stale
# one — --renew-anon-volumes forces it to pick up the freshly installed deps.
npm-install:
	docker compose build vite
	docker compose up -d --renew-anon-volumes vite

# Run the PHP (Pest) test suite.
test:
	docker compose run --rm app php artisan test

# Run the PHP test suite with the code coverage gate (see composer.json's
# "test-coverage" script for the enforced minimum threshold).
test-coverage:
	docker compose run --rm app composer test-coverage

# Run the frontend (Vitest) test suite once.
test-js:
	docker compose run --rm vite npm run test -- --run

# Run the frontend test suite with the code coverage gate (see vite.config.js
# for the enforced thresholds).
test-js-coverage:
	docker compose run --rm vite npm run test:coverage

# Lint the frontend.
lint:
	docker compose run --rm vite npm run lint

# Type-check the frontend.
type-check:
	docker compose run --rm vite npx tsc --noEmit

# Tail logs from all services.
logs:
	docker compose logs -f

# Open a shell in the app (PHP) container.
shell:
	docker compose exec app sh

# Laravel tinker REPL.
tinker:
	docker compose exec app php artisan tinker

# Run migrations.
migrate:
	docker compose exec app php artisan migrate

# Drop everything and re-migrate with seed data.
fresh:
	docker compose exec app php artisan migrate:fresh --seed

# Stop the stack and remove volumes.
clean:
	docker compose down -v
