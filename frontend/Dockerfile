# ================================
# 1️⃣ Build Stage
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first (for caching)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies (use the correct package manager)
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
    else npm install; fi

# Copy all source files
COPY . .

# Build the Vite app
RUN npm run build

# ================================
# 2️⃣ Runtime Stage (for Nginx)
# ================================
FROM nginx:stable-alpine AS production

# Copy compiled assets from the builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config if present
# (optional — skip this if docker-compose mounts it)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP
EXPOSE 80

# Health check (optional)
HEALTHCHECK CMD curl -f http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]