'use strict'

describe('Main Controller:', function () {

  var $controller;
  var $rootScope;
  var $httpBackend;
  var $location;
  var $window;
  var $interval;
  var storageService;

  beforeEach(function () {
    module('main.controller');
    module('rest.service');
    module('storage.service');
  });

  beforeEach(inject(function (_$controller_, _$rootScope_, _$window_, _$location_, _$httpBackend_, _$interval_, _storageService_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $window = _$window_;
    $location = _$location_;
    $httpBackend = _$httpBackend_;
    $interval = _$interval_;
    storageService = _storageService_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Expects controller to be defined', function () {
    expect($controller).to.not.be.undefined;
  });

  it('Should have variables correctly set', function () {
    var $scope = $rootScope.$new();
    var controller = $controller('main.controller', { $scope: $scope });
    expect($scope.showHome).to.be.true;
    expect($scope.showDevices).to.be.false;
    expect($scope.showPorts).to.be.false;
    expect($scope.showAbout).to.be.false;
    expect($rootScope.showMenu).to.be.false;
  });

  it('Should change values correctly on changeView("ports")', function () {
    var $scope = $rootScope.$new();
    var controller = $controller('main.controller', { $scope: $scope });
    $scope.changeView('ports');
    expect($scope.showHome).to.be.false;
    expect($scope.showDevices).to.be.false;
    expect($scope.showPorts).to.be.true;
    expect($scope.showAbout).to.be.false;
  });

  it('Should change values correctly on changeView("home")', function () {
    var $scope = $rootScope.$new();
    var controller = $controller('main.controller', { $scope: $scope });
    $scope.changeView('home');
    expect($scope.showHome).to.be.true;
    expect($scope.showDevices).to.be.false;
    expect($scope.showPorts).to.be.false;
    expect($scope.showAbout).to.be.false;
  });

  it('Should change values correctly on changeView("devices")', function () {
    var $scope = $rootScope.$new();
    var controller = $controller('main.controller', { $scope: $scope });
    $scope.changeView('devices');
    expect($scope.showHome).to.be.false;
    expect($scope.showDevices).to.be.true;
    expect($scope.showPorts).to.be.false;
    expect($scope.showAbout).to.be.false;
  });

  it('Should set default values on changeView("anyValue")', function () {
    var $scope = $rootScope.$new();
    var controller = $controller('main.controller', { $scope: $scope });
    $scope.changeView('12345');
    expect($scope.showHome).to.be.true;
    expect($scope.showDevices).to.be.false;
    expect($scope.showPorts).to.be.false;
    expect($scope.showAbout).to.be.false;
  });

  it('Should show about window when calling function', function () {
    var $scope = $rootScope.$new();
    var controller = $controller('main.controller', { $scope: $scope });
    var windowAlertSpy = sinon.spy($window, 'alert');
    $scope.showAboutInfo();
    assert(windowAlertSpy.calledOnce);
    assert(windowAlertSpy.calledWith("FloodGUI v1.1.0\n\nMore info at github.com/ermus19/floodgui\n\n@ermus19 2017"));
    windowAlertSpy.restore();
  })

  it('Should check connection with backend: succeed', function () {
    var $scope = $rootScope.$new();
    var controller = $controller('main.controller', { $scope: $scope });
    $scope.location = 'localhost';
    var configSpy = sinon.spy(storageService, "setSafe");
    var locationSpy = sinon.spy($location, 'path');
    var windowAlertSpy = sinon.spy($window, 'alert');
    $httpBackend.when('GET', "http://localhost:8080/wm/core/memory/json").respond(200, {
      "total": 264765440,
      "free": 231007368
    });
    $interval.flush(6000);
    $httpBackend.flush();
    expect(configSpy.called).to.be.false;
    expect(locationSpy.called).to.be.false;
    expect(windowAlertSpy.called).to.be.false;
    windowAlertSpy.restore();
  });

  it('Should check connection with backend: fail', function () {
    var $scope = $rootScope.$new();
    var controller = $controller('main.controller', { $scope: $scope });
    var configStubLocation = sinon.stub(storageService, "getLocation").returns('localhost');
    var configSpy = sinon.spy(storageService, "setSafe");
    var locationSpy = sinon.spy($location, 'path');
    var windowAlertSpy = sinon.spy($window, 'alert');
    $interval.flush(5000);
    expect(configSpy.called).to.be.true;
    expect(locationSpy.called).to.be.true;
    expect(windowAlertSpy.called).to.be.true;
    windowAlertSpy.restore();
  });

});
