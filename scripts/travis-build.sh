#!/bin/bash

if [[ $TRAVIS_OS_NAME == 'osx' ]]; then

    ./node_modules/.bin/electron-packager . --overwrite --platform=darwin --arch=x64 --prune=true --out=builds

elif [[ $TRAVIS_OS_NAME == 'linux' ]]; then

    ./node_modules/.bin/electron-packager .  --overwrite --platform=linux --arch=x64 --prune=true --out=builds
    
fi
