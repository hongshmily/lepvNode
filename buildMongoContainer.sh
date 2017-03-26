#!/bin/bash

echo "Building docker image linuxep/lepvmongo"
docker build -f docker/mongo/Dockerfile -t linuxep/lepvmongo .