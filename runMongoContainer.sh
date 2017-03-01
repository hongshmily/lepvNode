#!/bin/bash

echo "create mongo data directory on host if not yet"
mkdir -p ~/mongodata

echo "stop and remove existing dragonmongo container"
docker rm -f dragonmongo

echo "Run Mongo in container"
docker run --name dragonmongo -it -p 27017:27017 -v ~/mongodata:/data/db mongo mongod