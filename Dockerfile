# Build stage
FROM node:20-slim AS builder
WORKDIR /app

ARG PUBLIC_DIRECTUS_URL
ARG DIRECTUS_URL
ARG DIRECTUS_STATIC_TOKEN
ARG PUBLIC_SITE_URL

ENV PUBLIC_DIRECTUS_URL=$PUBLIC_DIRECTUS_URL
ENV DIRECTUS_URL=$DIRECTUS_URL
ENV DIRECTUS_STATIC_TOKEN=$DIRECTUS_STATIC_TOKEN
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-slim AS production
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 4322

ENV HOST=0.0.0.0
ENV PORT=4322

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:4322', (r) => {if (r.statusCode >= 200 && r.statusCode < 500) process.exit(0); else process.exit(1);})"

CMD ["node", "./dist/server/entry.mjs"]
