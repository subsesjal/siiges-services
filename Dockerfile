FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

COPY . .

RUN yarn bootstrap

EXPOSE 3000
