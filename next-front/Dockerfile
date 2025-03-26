# syntax=docker/dockerfile:1

# Define build arguments for Node.js and pnpm versions
ARG NODE_VERSION=22.14.0
ARG PNPM_VERSION=10.4.1

# Base image for development and building
FROM node:${NODE_VERSION} AS base

# Update Corepack and enable pnpm
RUN --mount=type=cache,target=/root/.npm \
    npm install --global corepack@latest && \
    corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Set working directory
WORKDIR /app

# Builder stage for installing dependencies and building the application
FROM base AS builder

# Copy package manager files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV PNPM_STORE_DIR=/root/.pnpm-store
RUN --mount=type=cache,target=${PNPM_STORE_DIR} \
    pnpm install
    #--frozen-lockfile

# Copy application source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage with minimal image
FROM node:${NODE_VERSION}-slim AS final

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Set working directory
WORKDIR /app

# Copy built application and dependencies from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production

# Expose application port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]