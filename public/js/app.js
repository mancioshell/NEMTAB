'use strict';

var mainApp = angular.module('mainApp', [
    'LocalStorageModule',
    'ngRoute',
    'myAppServices',
    'mainAppControllers'
]);


mainApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});


mainApp.config(['$routeProvider','$httpProvider',
    function($routeProvider,$httpProvider) {

        $routeProvider.
            when('/login', {
                templateUrl: 'partials/login',
                controller: 'LoginCtrl',
                access: { requiredLogin: false }
            }).
            when('/register', {
                templateUrl: 'partials/register',
                controller: 'RegistrationCtrl',
                access: { requiredLogin: false }
            }).
            when('/home', {
                templateUrl: 'partials/auth/home',
                controller: 'HomeCtrl',
                access: { requiredLogin: true }
            }).
            when('/person', {
                templateUrl: 'partials/auth/person',
                controller: 'PersonCtrl',
                access: { requiredLogin: true }
            }).
            when('/thing', {
                templateUrl: 'partials/auth/thing',
                controller: 'ThingCtrl',
                access: { requiredLogin: true }
            }).
            otherwise({
                redirectTo: '/login'
            });
    }

]);


mainApp.run(function($rootScope, $location, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {

        if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged()) {
            $location.path("/login");
        }

        if (AuthenticationService.isLogged() && !nextRoute.access.requiredLogin) {
            $location.path("/home");
        }
    });
});

