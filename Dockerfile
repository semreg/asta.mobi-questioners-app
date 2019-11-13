FROM node:12.2.0-alpine

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

ENV PATH /app/server/node_modules/.bin:$PATH

WORKDIR /app/server

EXPOSE 3001

CMD [ "yarn", "init:prod"]
