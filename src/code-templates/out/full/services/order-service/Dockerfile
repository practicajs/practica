FROM node:14.2.0-alpine3.11
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
COPY package-lock.json /app/
RUN npm ci --only=production
