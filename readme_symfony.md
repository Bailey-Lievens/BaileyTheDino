# Symfony specific info

## General info:
All commands have to be run in teh container itself. So you should open a session with `docker exec -ti <docker_container_name> /bin/bash`.
After you're free to interact with anything Symfony related.

Copy the .env.example to .env and customize where needed. The current db user/password are the same as the env in the root.

## Commands:
You can add more commands in the package.json file.
- `yarn dev` Compile all assets to the public folder
- `yarn watch` Compile all assets upon file change

## Notes:
- No idea how I can set up hot reloading :shrug: