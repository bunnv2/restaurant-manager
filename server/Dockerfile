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

# Expose the port that your Node.js app will listen on
EXPOSE 8080

# Start the Node.js application
CMD [ "npm", "start" ]
