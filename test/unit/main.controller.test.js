'use strict'

describe('Main Controller:', function () {

  var $controller;
  var $httpBackend;
  var $rootScope;

  beforeEach(function () {
    module('main.controller');
    module('rest.service');
    module('storage.service');
  });

  beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
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

  it('Should change values correctly on changeView("about")', function () {
    var $scope = $rootScope.$new();
    var controller = $controller('main.controller', { $scope: $scope });
    $scope.changeView('about');
    expect($scope.showHome).to.be.false;
    expect($scope.showDevices).to.be.false;
    expect($scope.showPorts).to.be.false;
    expect($scope.showAbout).to.be.true;
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

});
