# Stage 1: Build the application
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm ci --production

# Copy the rest of the application code to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Run the application in a lightweight container
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=build /app .

# Expose the port on which the NestJS application will run (default is 3000)
EXPOSE 3000

# Set the command to start the NestJS application
CMD [ "node", "dist/main" ]