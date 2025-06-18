#!/bin/bash

# Go to the main app directory
cd apps/main

# Install only production dependencies
npm install --omit=dev

# Build the application
npm run build

# Return to the root directory
cd ../..

echo "Deployment build completed successfully!" 