'use strict';

angular.module('main.app', ['ngRoute', 'login.controller', 'main.controller', 'graph.controller','rest.service', 'config.service'])


.config(function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl: "./views/main.view.html",
        controller: "main.controller",
    })
    .when("/login", {
        templateUrl: "./views/login.view.html",
        controller: "login.controller",
    })
    .otherwise({
        redirectTo : '/login'
    })
});