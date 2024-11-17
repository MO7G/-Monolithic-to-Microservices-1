#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" &> /dev/null
}

# Check if Node.js is installed
if ! command_exists node; then
  echo "Node.js is not installed. Please install Node.js before running this script."
  exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
  echo "npm is not installed. Please install npm before running this script."
  exit 1
fi

# Define your microservices
services=("products" "shopping" "customer")

# Loop through each service
for service in "${services[@]}"; do
  echo "Setting up $service service..."

  # Create the folder if it doesn't exist
  mkdir -p $service

  # Navigate into the folder
  cd $service

  # Initialize npm and install dependencies
  npm install express cors
  npm install nodemon -D

  # Navigate back to the root folder
  cd ..

  echo "$service service setup completed."
done

# Set up the gateway service
echo "Setting up gateway service..."

# Create the gateway folder if it doesn't exist
mkdir -p gateway

# Navigate into the gateway folder
cd gateway

# Initialize npm and install dependencies
npm install express cors express-http-proxy
npm install nodemon -D

# Navigate back to the root folder
cd ..

echo "Gateway service setup completed."

echo "All services and the gateway have been set up!"
