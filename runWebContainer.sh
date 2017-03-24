#!/bin/bash  

echo "running containers:"
docker ps
echo ""

echo "stop and remove existing LEPV container"
docker rm -f lepv

echo ""
echo "Run LEPV in container: http://localhost:8889"

docker run -t -p 8889:8889 linuxep/lepv