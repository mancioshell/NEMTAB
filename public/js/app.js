'use strict';

// Declare app level module which depends on filters, and services
angular.module('fantacalcio', ['ui.router','myApp.filters', 'myApp.services', 'myApp.directives']).
 config(['$stateProvider','$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {

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

        //$locationProvider.html5Mode(true);
 }]);


// Declare app level module which depends on filters, and services
angular.module('fantacalcio-app', ['ui.router','myApp.filters', 'myApp.services', 'myApp.directives']).
    config(['$stateProvider','$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {

        $urlRouterProvider.otherwise("/home")

        $stateProvider
            .state('home',{
                url:'/home',
                templateUrl : 'partial/home',
                controller : WebAppCtrl
            })

        //$locationProvider.html5Mode(true);
    }]);

