'use strict'

describe('App routes:', function () {

    var $location;
    var $route;
    var $rootScope;

    beforeEach(function () {
        module('main.app');
    });

    beforeEach(inject(function (_$location_, _$rootScope_, _$route_) {
        $location = _$location_;
        $rootScope = _$rootScope_;
        $route = _$route_;
    }));

    it('Expects route to be /login', function () {
        $location.path('login');
        $rootScope.$apply();
        expect($location.path()).to.be.equal('/login');
    });

    it('Expects /login controller to be login.controller', function () {
        $location.path('login');
        $rootScope.$apply();
        expect($route.current.controller).to.be.equal('login.controller');
    });

    it('Expects route to be /home', function () {
        $location.path('home');
        $rootScope.$apply();
        expect($location.path()).to.be.equal('/home');
    });

    it('Expects /home controller to be main.controller', function () {
        $location.path('home');
        $rootScope.$apply();
        expect($route.current.controller).to.be.equal('main.controller');
    });

    it('Expects route to be /previous', function () {
        $location.path('previous');
        $rootScope.$apply();
        expect($location.path()).to.be.equal('/previous');
    });

    it('Expects /previous controller to be login.controller', function () {
        $location.path('previous');
        $rootScope.$apply();
        expect($route.current.controller).to.be.equal('login.controller');
    });

    it('Expects route to be /form', function () {
        $location.path('form');
        $rootScope.$apply();
        expect($location.path()).to.be.equal('/form');
    });

    it('Expects /form controller to be form.controller', function () {
        $location.path('form');
        $rootScope.$apply();
        expect($route.current.controller).to.be.equal('form.controller');
    });

    it('Expects not defined location to route /login', function () {
        $location.path('test');
        $rootScope.$apply();
        expect($location.path()).to.be.equal('/login');
        expect($route.current.controller).to.be.equal('login.controller');
    });
});