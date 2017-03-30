'use strict';
var helpers = require('./test.helpers');

describe('Previous window interactions', function () {

    this.timeout(30000);

    var app = null;

    beforeEach(function (done) {
        helpers.startApp().then(function (startedApp) {
            app = startedApp;
            app.client.waitUntilWindowLoaded()
                .click('#thisButton');
        });
        setTimeout(function () {
            done();
        }, 5000)
    });

    afterEach(function () {
        return helpers.stopApp(app);
    });

    it('Should show previous window', function () {
        return app.client.waitUntilWindowLoaded()
            .getUrl().should.eventually.match(/previous/);
    });

    it('Should show previous connection', function () {
        return app.client.waitUntilWindowLoaded()
        .getUrl().should.eventually.match(/previous/)
        .isVisible('.previous').should.eventually.be.true;
    })
});