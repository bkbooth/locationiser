#!/bin/bash
set -ev

./scripts/check-for-changes.sh $TRAVIS_COMMIT_RANGE

if [[ $API_CHANGES == "true" ]]; then echo "running API pipeline"; fi
if [[ $CLIENT_CHANGES == "true" ]]; then echo "running client pipeline"; fi
