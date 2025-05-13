# To-Do List Application


## Getting started

Download [Docker Desktop](https://www.docker.com/products/docker-desktop) for Mac or Windows. Docker Compose will be automatically installed. 
On Linux, make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/).

## Clone the repository

Open a terminal and clone this sample application.

```
 git clone https://github.com/server-panel-alr/todo-docker
```

## Run the app

Navigate into the todo-list-app directory:

```
docker compose up -d --build
```

## List the services

```
docker compose ps
```

## Access the app

The to-do list app will be running at [http://localhost:3000](http://localhost:3000).