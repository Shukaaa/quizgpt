FROM node:lts-alpine

COPY dist/quizgpt /app/

RUN apk add --no-cache caddy

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
