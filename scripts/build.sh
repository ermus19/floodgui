#!/bin/bash

if [[ $(uname -s) == 'Darwin' ]]; then

    echo "Building for Darwin"
    ./node_modules/.bin/electron-packager . --overwrite --platform=darwin --icon=./app/assets/icons/app.icns --prune=true --out=builds

elif [[ $(uname -s) == 'Linux' ]]; then

    echo "Building for Linux"
    ./node_modules/.bin/electron-packager .  --overwrite --platform=linux --icon=./app/assets/icons/app.png --prune=true --out=builds

else

    echo "Platform not supported!"

fi
