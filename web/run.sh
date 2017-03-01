#!/bin/bash

ps | grep ./bin/www | grep node | awk '{print $1}' | xargs -I {} kill -9 {}

npm start