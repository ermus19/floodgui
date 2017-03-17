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

  it('Should set the IP form invisible when clicking "Back" button', function () {
    return app.client.waitUntilWindowLoaded()
      .click('#otherButton')
      .isVisible('.form').should.eventually.be.true
      .click('#backButton')
      .isVisible('.form').should.eventually.be.false;
  });
});