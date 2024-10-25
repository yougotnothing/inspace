#!/bin/bash

KEYCLOAK_URL="http://keycloak:8080/health/ready"
TIMEOUT=60

function wait_for_keycloak() {
  for i in $(seq 1 $TIMEOUT); do
    if curl -s -o /dev/null "$KEYCLOAK_URL"; then
      echo "Keycloak is up!"
      return 0
    fi
    echo "Waiting for Keycloak to be available..."
    sleep 1
  done
  echo "Keycloak did not become available in time!"
  exit 1
}

wait_for_keycloak

exec fastapi run main.py