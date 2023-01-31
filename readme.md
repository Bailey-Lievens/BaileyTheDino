# Docker-compose basic setup

## General info:
This project contains a boilerplate application containing
- mysql
- phpmyadmin
- php
- apache
- nodejs
- composer
- npm
- yarn

## Setup:
Copy the .env.example to .env and fill in the variables.

Run `docker-compose up -d` to start. 

Now go to [localhost](http://localhost/) and see your beautiful webpage!

Or go to http://localhost:8077/ to see that phpmyadmin!

## Commands:
- `docker-compose up -d` Starts up the image in detached mode (You can still use your container after)
- `docker-compose down` Stop the currently running docker containers
- `docker ps` Show all running docker containers
- `docker exec -ti <docker_container_name> /bin/bash` Start a terminal session in a specific container

## Notes:
- You can set the php and node version you require in the .env file
- You can remove things you don't need right here [docker/php/Dockerfile](docker/php/Dockerfile) by commenting/deleting parts.