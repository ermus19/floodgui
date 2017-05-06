# FloodGUI  [![Build Status](https://travis-ci.com/ermus19/floodgui.svg?token=JZERp3ng6S2a5pVRX2nz&branch=develop)](https://travis-ci.com/ermus19/floodgui)
![alt text](./app/assets/icons/app96x96.png "FloodGUI")        
Floodlight GUI using electron framework!

## Installation and usage: ##
From the project directory, install all dependencies before building:

```sh
npm install
```

For starting the app from the source code:
```sh
npm start
```

For building the source, depending on your platform:

```sh
npm run build
````

This will create a new directory called builds, containing the application built.

Currently, this instruction only supports **linux** and **macosx**.

Anyways, Windows build is possible using the electron-packager utility, more info here: [electron-packager](https://github.com/electron-userland/electron-packager)

*** 

For testing the code:

* Run unit test using karma:
```sh
npm run karma
```
**A new directory called coverage will be created containing the current code coverage of the unit tests.**

* Run functional test using spectron (needs json-server running):

```sh
npm run json-server
npm test
```
