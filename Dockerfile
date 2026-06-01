# Use Node.js runtime with OpenSSL libraries compatible with Prisma
FROM node:20-bookworm-slim

# Create app directory
WORKDIR /app

RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies from lockfile for deterministic builds
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["node", "src/index.js"]
