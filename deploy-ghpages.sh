#!/bin/bash
rm -rf out || exit 0;
mkdir out;
gulp build
( cd out
 git init
 git config user.name "Travis-CI"
 git config user.email "dosandkv@gmail.com"
 npm install
 gulp build
 git add .
 git commit -m "Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)