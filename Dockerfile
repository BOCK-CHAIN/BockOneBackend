FROM node:20-alpine

WORKDIR /app

# Install openssl which is often required by Prisma
RUN apk add --no-cache openssl

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies from lockfile for deterministic builds
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the application port
EXPOSE 5050

# Start the application
CMD ["npm", "start"]
