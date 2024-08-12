#!/bin/bash

# Print a message indicating the start of the setup process
echo "Starting setup..."

# Check if package.json exists
if [ ! -f package.json ]; then
  echo "Error: package.json not found in the current directory."
  exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
  echo "Error: npm is not installed. Please install Node.js and npm before proceeding."
  exit 1
fi

# Install project dependencies
echo "Installing dependencies..."
npm install

# Check if npm install was successful
if [ $? -ne 0 ]; then
  echo "Error: npm install failed."
  exit 1
fi

# Print a success message
echo "Setup completed successfully."
