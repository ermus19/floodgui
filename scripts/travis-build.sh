#!/usr/bin/env bash

if [[ $TRAVIS_OS_NAME == 'osx' ]]; then

    export DISPLAY=':99.0'
    Xvfb :99 -screen 0 1600x1200x32 > /dev/null 2>&1 &
    ./node_modules/.bin/electron-packager . --overwrite --platform=darwin --prune=true --out=builds

elif [[ $TRAVIS_OS_NAME == 'linux' ]]; then

    export DISPLAY=:99.0
	/sbin/start-stop-daemon --start --quiet --pidfile /tmp/custom_xvfb_99.pid --make-pidfile --background --exec /usr/bin/Xvfb -- :99 -ac -screen 0 1600x1200x32
    sleep 3
    ./node_modules/.bin/electron-packager .  --overwrite --platform=linux --no-prune --out=builds

fi
