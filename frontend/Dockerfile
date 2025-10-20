# Dockerfile (development)
FROM node:20-alpine

WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend source
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Run Vite dev server on all interfaces (important!)
CMD ["npm", "run", "dev", "--", "--host"]