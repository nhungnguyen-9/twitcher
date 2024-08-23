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