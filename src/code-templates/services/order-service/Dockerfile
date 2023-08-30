FROM node:18.16.0-alpine3.16
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
COPY package-lock.json /app/
RUN npm ci --only=production
