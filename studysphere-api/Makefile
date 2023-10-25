up:
	docker compose -f docker-compose.dev.yaml up -d

down:
	docker compose -f docker-compose.dev.yaml down -v

up_prod:
	docker compose -f docker-compose.prod.yml up -d --build
	docker-compose -f docker-compose.prod.yml exec web python manage.py migrate --noinput
	docker-compose -f docker-compose.prod.yml exec web python manage.py collectstatic --no-input --clear

prod_migrate:
	docker-compose -f docker-compose.prod.yml exec web python manage.py migrate --noinput

down_prod:
	docker compose -f docker-compose.prod.yml down -v
