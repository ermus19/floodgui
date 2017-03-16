'use strict'
var Application = require('spectron').Application
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var assert = chai.assert;


global.before(function () {
  chai.should();
  chai.use(chaiAsPromised);
});


describe('Login window interactions', function () {
  this.timeout(10000);

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

  it('Show IP form when clicking "Other Computer" button', function () {
    return this.app.client.waitUntilWindowLoaded()
      .click('#otherButton')
      .isVisible('.form').should.eventually.be.true;
  });

  it('Should set the IP form invisible when clicking "Back" button', function () {
    return this.app.client.waitUntilWindowLoaded()
      .click('#otherButton')
      .isVisible('.form').should.eventually.be.true
      .click('#backButton')
      .isVisible('.form').should.eventually.be.false;
  });
});