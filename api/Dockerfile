FROM node:22-slim

WORKDIR /api

COPY package.json .
COPY yarn.lock .
COPY prisma ./prisma/

RUN apt-get update && \
    apt-get install -y make gcc g++ python3

RUN npx prisma generate

COPY . .

EXPOSE 5174

CMD yarn add bcrypt && \ 
    yarn start:hmr