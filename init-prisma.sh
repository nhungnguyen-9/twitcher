#!/bin/sh

# Wait for the database to be available
until npx prisma migrate deploy; do
  echo "Waiting for the database to be available..."
  sleep 2
done

# Run Prisma generate
npx prisma generate

# Start Next.js in development mode
npm run dev
