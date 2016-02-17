#!/usr/bin/env bash
# Get to the Travis build directory, configure git and clone the repo
cd $HOME
rm -rf out || exit 0;
mkdir out
cd out
git init
git config user.name "Travis-CI"
git config user.email "dosandkv@gmail.com"
git clone --quiet --branch=gh-pages https://${GH_TOKEN}@${GH_REF} gh-pages > /dev/null

# Commit and Push the Changes
cd gh-pages
git rm -rf ./dist
npm install
gulp build
git add -f .
git commit -m "Deployed to Github Pages"
git push -fq origin gh-pages > /dev/null