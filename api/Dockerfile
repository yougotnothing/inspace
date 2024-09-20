FROM node:22-slim

WORKDIR /api

COPY package.json .
COPY yarn.lock .
COPY prisma ./prisma/

RUN apt-get update && \
    apt-get install -y make gcc g++ python3 && \
    yarn install && \
    npx prisma generate

COPY . .
    
EXPOSE 5174
    

CMD yarn start:hmr