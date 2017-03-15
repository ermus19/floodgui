'use strict';

angular.module('myApp.load.controller',[])

.controller('load.controller', function($scope, Test){

    console.log(config.get('location'));

    $scope.location = config.get('location');

});