'use strict'
var Application = require('spectron').Application
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var assert = chai.assert;


global.before(function () {
  chai.should();
  chai.use(chaiAsPromised);
});


describe('Application default launch:', function () {

  this.timeout(10000)

  beforeEach(function () {
    this.app = new Application({
      path: `${__dirname}/../node_modules/.bin/electron`,
      args: ['main.js']
    });
    return this.app.start();
  });

  beforeEach(function () {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness
  });

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('Shows an initial window', function () {
    return this.app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1)
      .browserWindow.isDevToolsOpened().should.eventually.be.false
      .browserWindow.isVisible().should.eventually.be.true
      .browserWindow.isFocused().should.eventually.be.true
  });

  it('Window bounds are default', function () {
    return this.app.client.waitUntilWindowLoaded()
      .browserWindow.getBounds().should.eventually.have.property('width').and.be.equal(1281)
      .browserWindow.getBounds().should.eventually.have.property('height').and.be.equal(800)
  });

  it('Window title is Floodlight controller GUI', function () {
    return this.app.client.waitUntilWindowLoaded()
      .browserWindow.getTitle().should.eventually.be.equal('Floodlight controller GUI');
  });

  it('Should load login view', function () {
    return this.app.client.waitUntilWindowLoaded()
      .getUrl().should.eventually.match(/login.html/);
  });

  it('Should have login form invisible', function () {
    return this.app.client.waitUntilWindowLoaded()
      .isVisible('.form').should.eventually.be.false;
  });

});