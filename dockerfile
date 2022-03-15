# Pull the Node image from Docker Hub
FROM node:14-slim

# Setting Working Directory
WORKDIR /usr/app

# Copying only package.json
COPY package*.json ./

# Copy build directory to container
COPY ./build ./build

# Install Dependencies
RUN npm install --global serve

EXPOSE 3000

# Run the React app
CMD ["serve", "-s", "build"]