FROM node:current-alpine3.11




RUN mkdir -p /usr/src/api/
WORKDIR /usr/src/api/

COPY package*.json /usr/src/api/
# RUN npm install && mv /usr/src/app/node_modules /node_modules

COPY . /usr/src/api/

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]