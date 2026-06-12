FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/dist ./dist

EXPOSE 8080

# Explicitly bind to 0.0.0.0 so Cloud Run can reach the container
CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:8080"]