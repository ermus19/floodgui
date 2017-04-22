'use strict'

describe('Main Controller:', function () {

  var $controller;
  var $httpBackend;
  var $rootScope;
  var $window;
  var storageService;

  beforeEach(function () {
    module('main.controller');
    module('rest.service');
    module('storage.service');
  });

  beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_, _$window_, _storageService_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $window = _$window_;
    storageService = _storageService_;
  }));

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
    assert(windowAlertSpy.calledWith("FloodGUI v1.0.0\n\nMore info at github.com/ermus19/floodgui\n\n@ermus19 2017"));
    windowAlertSpy.restore();
  })

});
