#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
if [ -f tmp/pids/server.pid ]; then
  rm -f tmp/pids/server.pid
fi

rails db:create
rails db:migrate
rails db:seed

exec "$@"