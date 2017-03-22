'use strict'

describe('Login Controller:', function () {

  var $controller;

  beforeEach(function () {
    module('load.controller');
    module('login.controller');
    module('rest.service');
  });

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  it('showLoading should change from true to false when calling onClickThis()', function () {
    var $scope = {};
    var controller = $controller('loginController', { $scope: $scope });
    expect($scope.showLoading).to.be.false;
    $scope.onClickThis();
    expect($scope.showLoading).to.be.true;

  });

  it('showForm should change from false to true when calling onClickOther()', function () {
    var $scope = {};
    var controller = $controller('loginController', { $scope: $scope });
    expect($scope.showForm).to.be.false;
    $scope.onClickOther();
    expect($scope.showForm).to.be.true;
  });

});
