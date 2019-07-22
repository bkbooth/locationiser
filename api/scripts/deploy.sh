#!/bin/bash
set -ev

git remote add gigalixir https://$GIGALIXIR_EMAIL:$GIGALIXIR_API_KEY@git.gigalixir.com/$GIGALIXIR_APP_NAME.git
git push -fv gigalixir `git subtree split --prefix=api master`:master
