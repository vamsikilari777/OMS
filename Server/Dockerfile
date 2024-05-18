# Use a base image with Node.js pre-installed
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
