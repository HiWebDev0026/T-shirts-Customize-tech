FROM node:current-alpine3.11

RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client

COPY package*.json /usr/src/client/


RUN npm install

COPY . /usr/src/client/


EXPOSE 3000

