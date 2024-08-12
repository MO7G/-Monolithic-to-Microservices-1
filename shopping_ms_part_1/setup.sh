#!/bin/bash

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
  npm init -y
  npm install express cors
  npm install nodemon -D

  # Navigate back to the root folder
  cd ..

  echo "$service service setup completed."
done

echo "All services have been set up!"
