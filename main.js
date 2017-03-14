'use strict'

const {
  app, BrowserWindow
} = require('electron');
const url = require('url');
const path = require('path');
const Config = require('electron-config');
var config = new Config();

if (config.size == 0) {
  config.set('width', 1281);
  config.set('height', 800);
}

let win;

function createWindow() {
  win = new BrowserWindow({
    width: config.get('width'),
    height: config.get('height'),
    minWidth: 1281,
    minHeight: 800
  })
  win.loadURL(url.format({
    pathname: path.join(__dirname, './app/views/home.html'),
    protocol: 'file:',
    slashes: true
  }))

  //win.webContents.openDevTools()

  win.on('resize', () => {
    let {
      width, height
    } = win.getBounds();

    config.set('width', width);
    config.set('height', height);

  })

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('windows-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

module.exports = {
  config: config
}
