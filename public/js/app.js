'use strict';

var mainApp = angular.module('mainApp', [
    'ngRoute',
    'mainAppControllers'
]);

mainApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'partial/login',
                controller: 'LoginCtrl'
            }).
            when('/register', {
                templateUrl: 'partial/register',
                controller: 'RegistrationCtrl'
            }).
            otherwise({
                redirectTo: '/login'
            });
    }
]);

var webApp = angular.module('webApp', [
    'ngRoute',
    'webAppControllers'
]);

webApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/main', {
                templateUrl: 'partial/auth/home',
                controller: 'HomeCtrl'
            }).
            otherwise({
                redirectTo: '/main'
            });
    }
]);