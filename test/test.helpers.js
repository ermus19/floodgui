'use strict';

var Application = require('spectron').Application;
var assert = require('assert')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
var path = require('path')

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});

exports.startApp = function () {
    if (process.platform === 'darwin') {
        var appPath = `${__dirname}/../builds/Floodgui-darwin-x64/FloodGUI.app/Contents/MacOS/FloodGUI`;
    } else if (process.platform === 'linux') {
        var appPath = `${__dirname}/../builds/Floodgui-linux-x64/FloodGUI`;
    }
    var app = new Application({
        path: appPath,
    });
    return app.start().then(function () {
        assert.equal(app.isRunning(), true);
        chaiAsPromised.transferPromiseness = app.transferPromiseness;
        return app;
    });
};


exports.stopApp = function (app) {
    if (!app || !app.isRunning()) {
        return;
    }
    return app.stop().then(function () {
        assert.equal(app.isRunning(), false)
    })
}