#!/bin/sh

# Run database migrations (continue even if it fails)
echo "Running database migrations..."
node node_modules/prisma/build/index.js db push --skip-generate || echo "Migration failed or already up to date"

# Start the application
echo "Starting application..."
exec node server.js
