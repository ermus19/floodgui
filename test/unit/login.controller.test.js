'use strict'

describe('Login Controller:', function () {

  var $controller;
  var $httpBackend;
  var $location;

  beforeEach(function () {
    module('login.controller');
    module('rest.service');
    module('config.service');
  });

  beforeEach(inject(function (_$controller_, _$httpBackend_, _$location_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;
  }));

  it('Expects controller to be defined', function () {
    expect($controller).to.not.be.undefined;
  });

  it('Should have variables correctly set', function () {
    var $scope = {};
    var controller = $controller('login.controller', { $scope: $scope });
    expect($scope.showLoading).to.be.false;
    expect($scope.showLoadingPrev).to.be.false;
    expect($scope.thisClicked).to.be.false;
  });

  it('Should show loading when calling onClickThis()', function () {
    var $scope = {};
    var controller = $controller('login.controller', { $scope: $scope });
    expect($scope.showLoading).to.be.false;
    $scope.onClickThis();
    expect($scope.showLoading).to.be.true;
  });
});
 