# Multi-stage build for React Native Web (Expo)

# Stage 1: Build the application
FROM node:20.18-alpine AS builder

# Update apk packages to reduce vulnerabilities
RUN apk update && apk upgrade

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the web application for static hosting
RUN npx expo export --platform web --output-dir web-build

# Stage 2: Production image with nginx
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/web-build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
