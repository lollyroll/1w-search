#!/usr/bin/env bash
# Get to the Travis build directory, configure git and clone the repo
cd $HOME
git config --global user.email "travis@travis-ci.org"
git config --global user.name "travis-ci"
git clone --quiet --branch=gh-pages https://${GH_TOKEN}@${GH_REF} gh-pages > /dev/null

# Commit and Push the Changes
cd gh-pages
git rm -rf ./dist
npm install -g gulp
gulp build
git add -f .
git commit -m "Deployed to Github Pages"
git push -fq origin gh-pages > /dev/null