FROM node:16

WORKDIR /app

COPY package*.json ./
COPY yarn*.lock ./

ENV NODE_ENV development

COPY . .

RUN yarn install
RUN yarn bootstrap

EXPOSE 3000

CMD ["yarn", "dev"]
