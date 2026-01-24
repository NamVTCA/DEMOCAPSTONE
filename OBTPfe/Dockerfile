# OBTPfe/Dockerfile
# 1) build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV VITE_API_BASE_URL=/api
RUN npm run build

# 2) production nginx stage
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA fallback
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
