.PHONY: up down logs build install prisma/generate

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

build:
	docker-compose build

install:
	docker-compose run --rm app npm install

prisma/generate:
	docker-compose run --rm app npx prisma generate
