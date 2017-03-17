'use strict'
var helpers = require('./test.helpers');


describe('Application default launch:', function () {

  this.timeout(10000);


  var app = null;

  beforeEach(function () {
    return helpers.startApp().then(function (startedApp) {
      app = startedApp;
    });
  });


  afterEach(function () {
    return helpers.stopApp(app);
  });

  it('Shows an initial window', function () {
    return app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1)
      .browserWindow.isDevToolsOpened().should.eventually.be.false
      .browserWindow.isVisible().should.eventually.be.true
      .browserWindow.isFocused().should.eventually.be.true
      .browserWindow.isResizable().should.eventually.be.true
  });

  it('Window minimun size is set', function () {
    return app.client.waitUntilWindowLoaded()
      .browserWindow.getMinimumSize().should.eventually.be.deep.equal([1023, 700]);
  });

  it('Window default size is used', function () {
    return app.client.waitUntilWindowLoaded()
      .browserWindow.getBounds().should.eventually.have.property('width').and.be.equal(1023)
      .browserWindow.getBounds().should.eventually.have.property('height').and.be.equal(700)
  })

  it('Window title is Floodlight controller GUI', function () {
    return app.client.waitUntilWindowLoaded()
      .browserWindow.getTitle().should.eventually.be.equal('Floodlight controller GUI');
  });

  it('Should keep bounds when resizing the window', function () {
    return app.client.waitUntilWindowLoaded()
      .browserWindow.set
  })

  it('Should load login view', function () {
    return app.client.waitUntilWindowLoaded()
      .getUrl().should.eventually.match(/login.html/);
  });

  it('Should have login form invisible', function () {
    return app.client.waitUntilWindowLoaded()
      .isVisible('.form').should.eventually.be.false;
  });

});