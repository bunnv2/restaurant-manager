# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /.

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your React app will run on
EXPOSE 3000

# Build the React app for production
RUN npm run build

# Serve the built React app using a simple server
CMD [ "npx", "serve", "-s", "build" ]
