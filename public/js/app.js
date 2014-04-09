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


/*
angular.module('fantacalcio', ['ui.router','myApp.filters', 'myApp.services', 'myApp.directives']).
 config(['$stateProvider','$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/login")

        $stateProvider
            .state('login',{
                url:'/login',
                templateUrl : 'partial/login',
                controller : LoginCtrl
            })
            .state('register',{
                url:'/register',
                templateUrl : 'partial/register',
                controller : RegistrationCtrl
            })
 }]);
*/





