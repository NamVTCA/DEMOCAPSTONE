# backend/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Cài cả dev deps để build
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
# Chỉ cài production deps
COPY package*.json ./
RUN npm ci --production
# Copy mã đã build
COPY --from=builder /app/dist ./dist
# Copy uploads (nếu bạn muốn giữ file upload cục bộ)
RUN mkdir -p /app/uploads
VOLUME ["/app/uploads"]

ENV NODE_ENV=production
EXPOSE 3000

# Nếu dist/seed.js có tồn tại thì chạy seed (idempotent), sau đó start
CMD sh -c "if [ -f dist/seed.js ]; then node dist/seed.js || true; fi && node dist/main.js"
