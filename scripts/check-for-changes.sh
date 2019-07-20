#!/bin/bash
set -ev

commit_range=${1?Error: please provide a commit range (eg. abc1234..def5678)}

if [[ $(git diff --name-only $commit_range | grep api/) ]]; then export API_CHANGES=true; fi
if [[ $(git diff --name-only $commit_range | grep client/) ]]; then export CLIENT_CHANGES=true; fi
if [[ $API_CHANGES != "true" ]] && [[ $CLIENT_CHANGES != "true" ]]; then
  export API_CHANGES=true
  export CLIENT_CHANGES=true
fi
