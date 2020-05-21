#!/bin/sh

NODE_ENV=$1
NPM_TOKEN=$2
SERVICE_PORT={{{scaffold_service_port}}};
APP_NAME={{{scaffold_docker_path}}};


docker build -t "$APP_NAME" --build-arg NODE_ENV=$NODE_ENV --build-arg SERVICE_PORT=$SERVICE_PORT --build-arg NPM_TOKEN=$NPM_TOKEN .;
exit 0;