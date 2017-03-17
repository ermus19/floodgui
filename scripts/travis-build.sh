#!/bin/bash

if [[ $TRAVIS_OS_NAME == 'osx' ]]; then

    export DISPLAY=':99.0'
    Xvfb :99 -screen 0 1600x1200x32 > /dev/null 2>&1 &
    ./node_modules/.bin/electron-packager . --overwrite --platform=darwin --prune=true --out=builds

elif [[ $TRAVIS_OS_NAME == 'linux' ]]; then

    export DISPLAY=:99.0
    sh -e /etc/init.d/xvfb start
    ./node_modules/.bin/electron-packager .  --overwrite --platform=linux --prune=true --out=builds
    
fi
