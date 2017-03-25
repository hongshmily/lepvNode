#!/bin/bash  

echo "running containers:"
docker ps
echo ""

echo ""
echo "Run LEPV Mongo in container with port 28018"

docker run -v ~/mongodata:/data/db -t -p 28018:27017 linuxep/lepvmongo