FROM node:16 AS dependencies
WORKDIR /app
COPY package*.json .
RUN npm install

FROM dependencies AS build
COPY . .
RUN npm run build

# FROM build AS test
# RUN npm run test

FROM node:16-alpine AS prod
RUN apk add dumb-init
USER node
WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm install --only=production

FROM prod
COPY --chown=node:node --from=build /app/.dist dist
ENV NODE_ENV production
ENV PORT 3000
ENV PRETTY_PRINT_LOG false
EXPOSE 3000
CMD [ "dumb-init", "node", "dist/start.js" ]
