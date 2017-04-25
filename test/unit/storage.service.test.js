'use strict';

describe('Storage Service:', function () {

    var storageService;
    var $localStorage

    beforeEach(function () {
        module('storage.service');
    });

    beforeEach(inject(function (_storageService_, _$localStorage_) {
        storageService = _storageService_;
        $localStorage = _$localStorage_;
    }));

    it('Expects Storage Service to be defined', function () {
        expect(storageService).to.not.be.undefined;
    });

    it('Expects functions to be set', function () {
        expect(storageService.setSafe).to.not.be.undefined;
        expect(typeof storageService.setSafe).to.be.equal('function');
        expect(storageService.getSafe).to.not.be.undefined;
        expect(typeof storageService.getSafe).to.be.equal('function');
        expect(storageService.setLocation).to.not.be.undefined;
        expect(typeof storageService.setLocation).to.be.equal('function');
        expect(storageService.getLocation).to.not.be.undefined;
        expect(typeof storageService.getLocation).to.be.equal('function');
    });

    it('Avoid setting the state on local storage if state is not boolean', function () {
        storageService.setSafe('true');
        expect($localStorage.state).to.be.undefined;
        storageService.setSafe(123);
        expect($localStorage.state).to.be.undefined;
    });

    it('Sets state correctly if state is boolean', function () {
        storageService.setSafe(true);
        expect($localStorage.state).to.be.true;
        storageService.setSafe(false);
        expect($localStorage.state).to.be.false;
    });

    it('Get state from local storage correctly', function () {
        storageService.setSafe(true);
        expect(storageService.getSafe()).to.be.true;
        storageService.setSafe(false);
        expect(storageService.getSafe()).to.be.false;
    });

    it('Sets location correctly if state is boolean', function () {
        storageService.setLocation('192.168.1.1');
        expect($localStorage.location).to.be.equal('192.168.1.1');
        storageService.setLocation('test');
        expect($localStorage.location).to.be.equal('test');
    });

    it('Get location from local storage correctly', function () {
        storageService.setLocation('192.168.1.1');
        expect(storageService.getLocation()).to.be.equal('192.168.1.1');
        storageService.setLocation('test');
        expect(storageService.getLocation()).to.be.equal('test');
    });
});