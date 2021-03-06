'use strict'

const {
  app, BrowserWindow
} = require('electron');
const url = require('url');
const path = require('path');
const Config = require('electron-config');
const config = new Config();

if (config.size == 0) {
  config.set('width', 1023);
  config.set('height', 700);
}

let win;

function createWindow() {

  win = new BrowserWindow({

    width: config.get('width'),
    height: config.get('height'),
    minWidth: 1023,
    minHeight: 700,
    icon: __dirname + './app/assets/icons/app.icns',
    show: false
  });

  win.loadURL(url.format({

    pathname: path.join(__dirname, './app/index.html'),
    protocol: 'file:',
    slashes: true

  }));

  win.once('ready-to-show', () => {
    win.show()
  })

  //win.webContents.openDevTools();

  win.on('resize', () => {

    let {
      width, height
    } = win.getBounds();

    config.set('width', width);
    config.set('height', height);

  });

  win.on('closed', () => {
    win = null;
  });

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

