#!/bin/sh

# Run database migrations
echo "Running database migrations..."
node node_modules/prisma/build/index.js db push --accept-data-loss --skip-generate

# Start the application
echo "Starting application..."
exec node server.js
