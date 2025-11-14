# Use Node.js LTS Alpine image
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm@9.0.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Remove dev dependencies to reduce image size
RUN pnpm prune --prod

# Expose port (configurable via PORT env var)
EXPOSE ${PORT:-3000}

# Set default environment variables
ENV NODE_ENV=production

# Run the application
CMD ["node", "dist/http-server.js"]

