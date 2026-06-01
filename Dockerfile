FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Also copy prisma schema before npm install because of postinstall step
COPY prisma ./prisma/

# Install dependencies from lockfile for deterministic builds
RUN npm ci

# Bundle app source
COPY . .

# Generate Prisma Client explicitly just in case (the postinstall hook handles it, but good to be sure with the schema copied in)
# The schema was copied in the above step.
RUN npx prisma generate

# Expose port (adjust if necessary, backend runs on 3001)
EXPOSE 3001

# Command to run the app
CMD [ "npm", "start" ]
