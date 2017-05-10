'use strict';

describe('Graph Controller:', function () {

    var $controller;
    var $rootScope;
    var $httpBackend;
    var $location;
    var $interval;
    var $window;
    var $rootScope;
    var devicesService;
    var storageService;

    beforeEach(function () {
        module('graph.controller');
        module('rest.service');
        module('utils.service');
        module('storage.service');
        module('devices.service');
        module('graph.service');
    });

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _$location_, _$interval_, _$window_, _devicesService_, _storageService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $interval = _$interval_;
        $window = _$window_;
        devicesService = _devicesService_;
        storageService = _storageService_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Expects controller to be defined', function () {
        expect($controller).to.not.be.undefined;
    });

    it('Should have variables correctly set on controller default', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('graph.controller', { $scope: $scope });
        $interval.flush(1000);
        expect($scope.showLoading).to.be.false;
        expect($scope.btnDisabled).to.be.true;
    });
    
});