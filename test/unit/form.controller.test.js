'use strict';

describe('Form Controller:', function () {

    var $controller;
    var $rootScope;
    var $httpBackend;
    var $location;
    var $timeout;
    var $window;
    var $rootScope;
    var storageService;

    beforeEach(function () {
        module('form.controller');
        module('rest.service');
        module('storage.service');
    });

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _$location_, _$timeout_, _$window_, _storageService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $timeout = _$timeout_;
        $window = _$window_;
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
        var $scope = {};
        var controller = $controller('form.controller', { $scope: $scope });
        expect(typeof $scope.ipPattern).to.be.equal('object');
    });

    it('Should clear ip form when clicking back button', function () {
        var $scope = $rootScope.$new();
        $scope.ipForm = {
            $valid: true,
            $setPristine: function () { }
        };
        var controller = $controller('form.controller', { $scope: $scope });
        var setPristineSpy = sinon.spy($scope.ipForm, '$setPristine');
        var locationSpy = sinon.spy($location, 'path');
        $scope.onClickBack();
        expect($scope.ip).to.be.null;
        expect(setPristineSpy.called).to.be.true;
        assert(locationSpy.calledWith('/login'));
    });

    it('Should submit ip form when clicking submit button: valid connection', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('form.controller', { $scope: $scope });
        var locationSpy = sinon.spy($location, 'path');
        var storageServiceSafeSpy = sinon.spy(storageService, 'setSafe');
        var storageServiceLocationSpy = sinon.spy(storageService, 'setLocation');
        $scope.ip = 'localhost';
        $httpBackend.when('GET', "http://localhost:8080/wm/core/memory/json").respond({
            "total": 264765440,
            "free": 231007368
        });
        $scope.onClickSubmit();
        expect($scope.submitLoading).to.be.true;
        $timeout.flush();
        $httpBackend.flush();
        assert(storageServiceSafeSpy.calledWith(true));
        assert(storageServiceLocationSpy.calledWith('localhost'));
        assert(locationSpy.calledWith('/home'));
    });

    it('Should submit ip form when clicking submit button: invalid connection', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('form.controller', { $scope: $scope });
        var locationSpy = sinon.spy($location, 'path');
        var windowSpy = sinon.spy($window, 'alert');
        var storageServiceSafeSpy = sinon.spy(storageService, 'setSafe');
        var storageServiceLocationSpy = sinon.spy(storageService, 'setLocation');
        $scope.ip = 'localhost';
        $httpBackend.when('GET', "http://localhost:8080/wm/core/memory/json").respond(400);
        $scope.onClickSubmit();
        expect($scope.submitLoading).to.be.true;
        $timeout.flush();
        $httpBackend.flush();
        assert(storageServiceSafeSpy.calledWith(false));
        expect(storageServiceLocationSpy.called).to.be.false;
        expect(locationSpy.called).to.be.false;
        expect($scope.ip).to.be.null;
        expect($scope.submitLoading).to.be.false;
        windowSpy.restore();
    });

    it('Should filter value: 1', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('form.controller', { $scope: $scope });
        var $event = {
            keyCode: 49,
            preventDefault: function () { }
        };
        var preventDefaultSpy = sinon.spy($event, 'preventDefault');
        $scope.filterValue($event);
        expect(preventDefaultSpy.called).to.be.false;
    });

    it('Should filter value: "a"', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('form.controller', { $scope: $scope });
        var $event = {
            keyCode: 97,
            preventDefault: function () { }
        };
        var preventDefaultSpy = sinon.spy($event, 'preventDefault');
        $scope.filterValue($event);
        expect(preventDefaultSpy.called).to.be.true;
    });

});