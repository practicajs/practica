FROM node:16-bullseye AS base

WORKDIR /app
RUN npm install turbo -g
COPY . .
RUN npx turbo prune --scope=order-service --docker
 
FROM node:16-bullseye AS build

WORKDIR /app
COPY --from=base /app/out/json/ .
COPY --from=base /app/out/full/services/order-service/data-access-prisma services/order-service/data-access-prisma
COPY --from=base /app/out/package-lock.json package-lock.json
RUN npm install
 
# Build
COPY --from=base /app/out/full/ .
COPY turbo.json turbo.json
RUN npm run build

# Install prod dependencies
RUN npm install --omit=dev

# Production
FROM node:16-alpine AS production
RUN apk add dumb-init
 
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 service
USER service

WORKDIR /app
COPY --from=build /app .
 
ENV PORT=3000
ENV PRETTY_PRINT_LOG=false

EXPOSE 3000
CMD ["dumb-init", "node", "services/order-service/.dist/start.js"]
