#!/bin/sh
date

echo "Updating daily country..."
echo "Using APP_URL: ${APP_URL}"

echo "Environment variables:"
env

echo "Testing connection to ${APP_URL}..."
echo "Testing connection to ${CRON_API_SECRET} SECRET..."
curl -v "${APP_URL}" || echo "Connection failed"

echo "Calling API endpoint..."
curl -v -X POST "${APP_URL}/api/cron" \
  -H "Authorization: Bearer ${CRON_API_SECRET}" \
  -H "Content-Type: application/json"

echo "Done!"