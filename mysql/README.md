## Introduction

The MySQL database runs inside a docker container and exposes port 3306 for connecting via CLI

## Requirements on machine
* docker
* docker-compose
* sudo privileges

## To Run the container with MySQL installed inside

### With BASH
```bash
    sudo docker compose -f docker-compose.yml up
```
OR to run in background:
```bash
    sudo docker compose -f docker-compose.yml up -d
```

## Connecting to Docker MySQL (if you have local MySQL install):
```bash
    mysql -h127.0.0.1 -P 3306 -u root -p
    [ENTER]
    <password>
```
## Connecting to Docker MySQL (works without local MySQL installed):

### First find the <containerName> of Docker Container just created, (Docker container must be running):
```bash
    docker container ls --format "{{.Names}}"
```
### Connect to the container
```bash
    docker exec -it <containerName> bash```
```
### Start MySQL from the container
```bash
    mysql -u root -p
    [ENTER]
    <password>
```


