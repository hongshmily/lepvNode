#!/bin/bash  

ps | grep npm | awk '{print $1}' | xargs -I {} kill -9 {}
ps | grep node ./bin/www | awk '{print $1}' | xargs -I {} kill -9 {}

cd ./web
npm start

cd ..