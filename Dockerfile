FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3001
USER node
CMD ["node", "index.mjs"]