FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

RUN apk add --no-cache caddy

COPY Caddyfile /etc/caddy/Caddyfile
