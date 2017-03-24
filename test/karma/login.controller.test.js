'use strict'

describe('Login Controller:', function () {

  var $controller;
  var $httpBackend;

  beforeEach(function () {
    module('load.controller');
    module('login.controller');
    module('rest.service');
    module('config.service');
  });

  beforeEach(inject(function (_$controller_, _$httpBackend_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));

  it('Expects controller to be defined', function () {
    expect($controller).to.not.be.undefined;
  });

  it('Should have variables correctly set', function () {
    var $scope = {};
    var controller = $controller('login.controller', { $scope: $scope });
    expect($scope.showLoading).to.be.false;
    expect($scope.submitLoading).to.be.false;
    expect($scope.thisClicked).to.be.false;
    expect($scope.showForm).to.be.false;
  });

  it('Should change boolean variables when calling onClickThis()', function () {
    var $scope = {};
    var controller = $controller('login.controller', { $scope: $scope });
    expect($scope.showLoading).to.be.false;
    $scope.onClickThis();
    expect($scope.showLoading).to.be.true;
  });

  it('Should change boolean variables when calling onClickOther()', function () {
    var $scope = {};
    var controller = $controller('login.controller', { $scope: $scope });
    expect($scope.showForm).to.be.false;
    $scope.onClickOther();
    expect($scope.showForm).to.be.true;
  });

});
