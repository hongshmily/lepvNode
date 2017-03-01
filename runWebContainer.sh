#!/bin/bash  

echo "running container:"
docker ps

echo "stop and remove existing Dragonfly container"
docker rm -f dragonfly

echo "Run Dragonfly in container"
echo "QA_CODE_ROOT=" $QA_CODE_ROOT

docker run --name dragonfly -p 9900:9900 -v ~/dragonfly/dragonfly:/var/dragonfly -v ~/dragonfly/qa:/var/qa -it node /var/dragonfly/web/run.sh