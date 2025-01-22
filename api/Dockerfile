FROM node:22-alpine3.18 AS builder
WORKDIR /api
COPY package.json .
COPY yarn.lock .
COPY prisma ./prisma/

RUN apk add --no-cache openssl
RUN yarn install
RUN yarn prisma generate

COPY . .
EXPOSE 5174
CMD yarn start:hmr
