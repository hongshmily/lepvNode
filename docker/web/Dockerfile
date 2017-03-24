FROM node

RUN mkdir /website
WORKDIR /website
USER root
ADD . /website/

WORKDIR /website/web

ENTRYPOINT ["npm", "start"]