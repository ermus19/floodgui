'use strict';
var helpers = require('./test.helpers');

describe('Main window interactions', function () {

    this.timeout(30000);

    var app = null;

    before(function (done) {
        helpers.startApp().then(function (startedApp) {
            app = startedApp;
            app.client.waitUntilWindowLoaded()
                .click('#thisButton');
            setTimeout(function () {
                app.client
                    .getUrl().should.eventually.match(/home/);
                done();
            }, 3000);
        });
    });

    after(function () {
        return helpers.stopApp(app);
    });

    it('Should show main window', function () {
        return app.client.waitUntilWindowLoaded()
            .getUrl().should.eventually.match(/home/);

    });
});