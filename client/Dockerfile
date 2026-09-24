# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================

# IMPORTANT: Node.js and Nginxinc Image Version Maintenance
# This Dockerfile uses Node.js 24.13.0-slim and Nginxinc image with alpine3.22, which was the latest LTS version at the time of writing.
# To ensure security and compatibility, regularly validate and update the NODE_VERSION ARG and NGINXINC_IMAGE_TAG to the latest LTS versions.

ARG NODE_VERSION=26.10.0-alpine3.24

FROM node:${NODE_VERSION} AS dependencies

# Set the working directory
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json package-lock.json* ./

# Install project dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# ============================================
# Stage 2: Build Next.js Application
# ============================================

FROM node:${NODE_VERSION} AS builder

# Set the working directory
WORKDIR /app

# Copy project dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application source code
COPY . .

ENV NODE_ENV=production

# Next.js collects telemetry.
# let's just stop that here...
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js application
RUN --mount=type=cache,target=/app/.next/cache npm run build;

# =========================================
# Stage 3: Serve Static Files with serve
# =========================================

FROM node:${NODE_VERSION} AS runner

# Set the working directory
WORKDIR /app

# Install serve globally (pinned version for reproducibility, update to the latest version as needed)
# Cache npm global installs to speed up builds
RUN --mount=type=cache,target=/root/.npm npm install -g serve@14.2.5

# Set the port for serve (default is 3000)
ENV PORT=3000

# Copy the static build output from the build stage
COPY --from=builder --chown=node:node /app/out ./out

# Use the built-in non-root user for security best practices
USER node

# Expose port 3000 to allow HTTP traffic
EXPOSE 3000

# Start serve to serve static files
# -s: serve single-page application (SPA) mode
# -l: listen on specified port
# -n: no clipper (don't show file listing)
CMD ["serve", "-s", "out", "-l", "3000", "-n"]