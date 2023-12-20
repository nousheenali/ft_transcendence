FROM node:18 AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Build the Next.js application
RUN npm run build

FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./


RUN npm install 
# Copy the built app from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
