'use strict';

describe('Devices Controller:', function () {

    var $controller;
    var $rootScope;
    var $interval;
    var $timeout;
    var devicesService;

    beforeEach(function () {
        module('devices.controller');
        module('devices.service');
        module('utils.service');
    });

    beforeEach(inject(function (_$controller_, _$rootScope_, _$interval_, _$timeout_, _devicesService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $interval = _$interval_;
        $timeout = _$timeout_;
        devicesService = _devicesService_;
    }));

    it('Expects controller to be defined', function () {
        expect($controller).to.not.be.undefined;
    });

    it('Should have variables correctly set on controller default', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('devices.controller', { $scope: $scope });
        expect($scope.showEmptyDevices).to.be.false;
        expect($scope.showDevicesList).to.be.false;
    });

    it('Should behave correctly when retrieving empty devices list', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('devices.controller', { $scope: $scope });
        var devicesServiceStub = sinon.stub(devicesService, "getDevices").returns([]);
        $interval.flush(11000);
        expect($scope.showEmptyDevices).to.be.true;
        expect(devicesServiceStub.callCount).to.be.equal(1);
    });

    it('Should behave correctly when retrieving devices list', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('devices.controller', { $scope: $scope });
        var devicesServiceStub = sinon.stub(devicesService, "getDevices").returns([{
            "id": 0,
            "mac": "-",
            "switch": "-",
            "port": "-",
            "ipv4": "-",
            "ipv6": "-",
            "dhcpName": "-",
            "lastSeen": "-"
        }]);
        $interval.flush(7000);
        expect($scope.showEmptyDevices).to.be.false;
        expect(devicesServiceStub.callCount).to.be.equal(1);
        $timeout.flush();
        expect($scope.devices).to.be.deep.equal([{
            "id": 0,
            "mac": "-",
            "switch": "-",
            "port": "-",
            "ipv4": "-",
            "ipv6": "-",
            "dhcpName": "-",
            "lastSeen": "-"
        }]);
        expect($scope.showDevicesList).to.be.true;
        expect($scope.showEmptyDevices).to.be.false;
    });

});