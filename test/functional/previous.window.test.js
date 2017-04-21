'use strict';
var helpers = require('./test.helpers');

describe('Previous window interactions:', function () {

    this.timeout(30000);

    var app = null;

    beforeEach(function () {
        return helpers.startApp().then(function (startedApp) {
            app = startedApp;
        });
    });

    afterEach(function () {
        return helpers.stopApp(app);
    });

    it('Should show previous connection window', function () {
        return app.client.waitUntilWindowLoaded()
            .getUrl().should.eventually.match(/previous/)
    });

    it('Should show login when clicking "back" button', function () {
        return app.client.waitUntilWindowLoaded()
            .click('#backButtonPrev').waitUntilWindowLoaded()
            .getUrl().should.eventually.match(/login/);
    });

});