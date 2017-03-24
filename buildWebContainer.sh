#!/bin/bash

echo "Building docker image linuxep/lepv"
docker build -f docker/web/Dockerfile -t linuxep/lepv .