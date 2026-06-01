FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

# Copy prisma schema and generate client
COPY server/prisma ./server/prisma/
RUN cd server && npx prisma generate

# Copy rest of the application
COPY . .

WORKDIR /app/server

ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]
