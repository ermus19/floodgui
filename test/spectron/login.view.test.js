var helpers = require('./test.helpers');

describe('Login window interactions', function () {

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

  it('Show IP form when clicking "Other Computer" button', function () {
    return app.client.waitUntilWindowLoaded()
      .click('#otherButton')
      .isVisible('.form').should.eventually.be.true;
  });

  it('Should have back button enabled', function () {
    return app.client.waitUntilWindowLoaded()
    .click('#otherButton')
    .isEnabled('#backButton').should.eventually.be.true;
  })

  it('Should set the IP form invisible when clicking "Back" button', function () {
    return app.client.waitUntilWindowLoaded()
      .click('#otherButton')
      .isVisible('.form').should.eventually.be.true
      .click('#backButton')
      .isVisible('.form').should.eventually.be.false;
  });

  it('Should have IP form submit button disabled', function () {
    return app.client.waitUntilWindowLoaded()
    .click('#otherButton')
    .isEnabled('#submitButton').should.eventually.be.false;
  });

  it('Should prevent characters on IP form', function () {
    return app.client.waitUntilWindowLoaded()
    .click('#otherButton')
    .setValue('.form-control', 'abcdefghijklmnñopqrstuvwxyz`+´ç')
    .getValue('.form-control').should.eventually.equal('');
  });

  it('Should allow numbers and points on IP form', function () {
    return app.client.waitUntilWindowLoaded()
    .click('#otherButton')
    .setValue('.form-control', '192.158..12335.23532')
    .getValue('.form-control').should.eventually.equal('192.158..12335.23532');
  });

  it('Should allow IP form submit on valid IP: [1.1.1.1, 192.168.1.1, 0.0.0.0]', function () {
    return app.client.waitUntilWindowLoaded()
    .click('#otherButton')
    .setValue('.form-control', '1.1.1.1')
    .isEnabled("#submitButton").should.eventually.be.true
    .setValue('.form-control', '0.0.0.0')
    .isEnabled("#submitButton").should.eventually.be.true
    .setValue('.form-control', '192.168.1.1')
    .isEnabled("#submitButton").should.eventually.be.true;
  });

  it('Should prevent IP form submit on invalid IP: [192.168..1.1, 192.1.1.1.1, 1922.168.1.1, 192.168.1.2.]', function () {
    return app.client.waitUntilWindowLoaded()
    .click('#otherButton')
    .setValue('.form-control', '192.168..1.1')
    .isEnabled("#submitButton").should.eventually.be.false
    .setValue('.form-control', '192.1.1.1.1')
    .isEnabled("#submitButton").should.eventually.be.false
    .setValue('.form-control', '1922.168.1.1')
    .isEnabled("#submitButton").should.eventually.be.false
    .setValue('.form-control', '192.168.1.2.')
    .isEnabled("#submitButton").should.eventually.be.false;
  })

});