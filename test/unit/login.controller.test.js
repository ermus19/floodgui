'use strict'

describe('Login Controller:', function () {

  var $controller;
  var $httpBackend;
  var $location;
  var $timeout;
  var $window;
  var $rootScope;
  var storageService;

  beforeEach(function () {
    module('login.controller');
    module('rest.service');
    module('storage.service');
  });

  beforeEach(inject(function (_$controller_, _$httpBackend_, _$location_, _$timeout_, _$window_, _storageService_) {
    $controller = _$controller_;
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
    var controller = $controller('login.controller', { $scope: $scope });
    expect($scope.showLoading).to.be.false;
    expect($scope.showLoadingPrev).to.be.false;
    expect($scope.thisClicked).to.be.false;
  });

  it('Expects as config.getSafe() returns false', function () {
    var $scope = {};
    var configStub = sinon.stub(storageService, "getSafe").returns(false);
    var controller = $controller('login.controller', { $scope: $scope });
    expect(configStub.calledOnce).to.be.true;
    expect($location.path()).to.be.equal('/login');
    expect($scope.location).to.be.undefined;
  });

  it('Expects as config.getSafe() returns true', function () {
    var $scope = {};
    var configStub = sinon.stub(storageService, "getSafe").returns(true);
    var controller = $controller('login.controller', { $scope: $scope });
    expect(configStub.calledOnce).to.be.true;
    expect($location.path()).to.be.equal('/previous');
  });

  it('Should set $scope.location to "This computer!"', function () {
    var $scope = {};
    var configStub = sinon.stub(storageService, "getSafe").returns(true);
    var configStubLocation = sinon.stub(storageService, "getLocation").returns('localhost');
    var controller = $controller('login.controller', { $scope: $scope });
    expect(configStub.calledOnce).to.be.true;
    expect($scope.location).to.be.equal('This Computer!');
  });

  it('Should set $scope.location to "IP: 192.168.1.1"', function () {
    var $scope = {};
    var configStub = sinon.stub(storageService, "getSafe").returns(true);
    var configStubLocation = sinon.stub(storageService, "getLocation").returns('192.168.1.1');
    var controller = $controller('login.controller', { $scope: $scope });
    expect(configStub.calledOnce).to.be.true;
    expect($scope.location).to.be.equal('IP: 192.168.1.1');
  });

  it('Should set variables correctly when calling onClickThis()', function () {
    var $scope = {};
    var controller = $controller('login.controller', { $scope: $scope });
    $scope.onClickThis();
    expect($scope.showLoading).to.be.true;
    expect($scope.thisClicked).to.be.true;
  });

  it('Should set variables correctly when calling onClickThis() after timeout', function () {
    var $scope = {};
    var controller = $controller('login.controller', { $scope: $scope });
    var windowAlertSpy = sinon.spy($window, 'alert');
    $scope.onClickThis();
    $timeout.flush();
    assert(windowAlertSpy.calledOnce);
    assert(windowAlertSpy.calledWith("Can't connect to localhost"));
    windowAlertSpy.restore();
    expect($scope.showLoading).to.be.false;
    expect($scope.thisClicked).to.be.false;
  });

  it('Should show form view when calling onClickOther()', function () {
    var $scope = {};
    var controller = $controller('login.controller', { $scope: $scope });
    var locationSpy = sinon.spy($location, 'path');
    $scope.onClickOther();
    assert(locationSpy.calledOnce);
    assert(locationSpy.calledWith('/form'));
  });

  it('Should change location and safeness when calling onClickBackPrev()', function () {
    var $scope = {};
    var controller = $controller('login.controller', { $scope: $scope });
    var configSpy = sinon.spy(storageService, "setSafe");
    var locationSpy = sinon.spy($location, 'path');
    $scope.onClickBackPrev();
    assert(locationSpy.calledWith('/login'));
    assert(configSpy.calledOnce);
    assert(configSpy.calledWith(false));
  });

  it('Should change location and safeness when calling onClickPrev()', function () {
    var $scope = {};
    var controller = $controller('login.controller', { $scope: $scope });
    var locationSpy = sinon.spy($location, 'path');
    $scope.onClickPrev();
    expect($scope.showLoadingPrev).to.be.true;
  });

  it('Should test the location of controller', function () {
    var $scope = {};
    var location = 'localhost';
    var controller = $controller('login.controller', { $scope: $scope });
    var configSpy = sinon.spy(storageService, "setSafe");
    var configSpyLocation = sinon.spy(storageService, "setLocation");
    var locationSpy = sinon.spy($location, 'path');
    $httpBackend.when('GET', "http://localhost:8080/wm/core/memory/json").respond({
      "total": 264765440,
      "free": 231007368
    });
    $scope.checkConnection(location);
    $httpBackend.flush();
    assert(configSpy.calledWith(true));
    assert(configSpyLocation.calledWith(location));
    assert(locationSpy.calledWith('/home'));

  });

});
