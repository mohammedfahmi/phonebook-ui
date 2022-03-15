# Pull the Node image from Docker Hub
FROM node:14-slim

# Setting Working Directory
WORKDIR /usr/app

# Copying only package.json
COPY package*.json ./

# Copy rest of the code to container
COPY . .

# Install Dependencies
RUN npm install --global serve

EXPOSE 3000

# Run the React app
CMD ["npm", "start"]