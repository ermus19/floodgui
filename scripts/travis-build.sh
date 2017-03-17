#!/bin/bash

if [[ $TRAVIS_OS_NAME == 'osx' ]]; then

    ./node_modules/.bin/electron-packager . --overwrite --platform=darwin --prune=true --out=builds

elif [[ $TRAVIS_OS_NAME == 'linux' ]]; then

    ./node_modules/.bin/electron-packager .  --overwrite --platform=linux --prune=true --out=builds
    
fi
