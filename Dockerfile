FROM caddy:alpine

COPY dist/quizgpt /app/
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
