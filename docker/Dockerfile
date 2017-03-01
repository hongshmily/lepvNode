FROM node:4-alpine

RUN mkdir /website
WORKDIR /website
USER root
ADD . /website/

WORKDIR /website/web

#RUN npm install body-parser express

RUN npm install

ENTRYPOINT ["npm", "start"]