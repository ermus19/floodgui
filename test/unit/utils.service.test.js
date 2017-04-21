'use strict';

describe('Utils Service:', function () {

    var utilsService;

    beforeEach(function () {
        module('utils.service');
    });

    beforeEach(inject(function(_utilsService_){
        utilsService = _utilsService_;
    }));

    it('Expects Utils Service to be defined', function () {
        expect(utilsService).to.not.be.undefined;
    });

    it('Expects functions to be set', function() {
        expect(utilsService.convertTime).to.not.be.undefined;
        expect(typeof utilsService.convertTime).to.be.equal('function');
        expect(utilsService.memorySet).to.not.be.undefined;
        expect(typeof utilsService.memorySet).to.be.equal('function');
        expect(utilsService.convertBw).to.not.be.undefined;
        expect(typeof utilsService.convertBw).to.be.equal('function');
    });

    it('Expects convert time in ms:1491561241781 to "10h 34m 1s"', function () {
        expect(utilsService.convertTime(1491561241781)).to.be.equal('10h 34m 1s');
    });
    
    it('Expects convert time in ms:1233455 to "20m 33s"', function () {
        expect(utilsService.convertTime(1233455)).to.be.equal('20m 33s');
    });

    it('Expects convert time in ms:23455 to "23s"', function () {
        expect(utilsService.convertTime(23455)).to.be.equal('23s');
    });

    it('Expects convert time in ms:0 to "0s"', function () {
        expect(utilsService.convertTime(0)).to.be.equal('0s');
    });

    it('Expects convert time in ms:-1 to "0s"', function () {
        expect(utilsService.convertTime(-3)).to.be.equal('0s');
    });
});