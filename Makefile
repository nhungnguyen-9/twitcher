# start and restart all the services
docker.up:
	docker compose up

# stop running containers, also removes stopped containers
docker.down:
	docker compose down

# only start a existing container
docker.start:
	docker compose start

# only stop running container
docker.stop:
	docker compose stop

# this script created a new SQL migration file inside `prisma/migrations`
# It executed the SQL migration file
# It ran prisma generate under the hood
prisma.migrate:
	npx prisma migrate dev --name init

# generate database
prisma.generate:
	npx prisma generate

# sync database with the Prisma schema
prisma.push:
	npx prisma db push

# visual editor for the database
prisma.studio:
	npx prisma studio

PHONY: docker.up docker.down docker.start docker.stop prisma.migrate prisma.generate prisma.push prisma.studio