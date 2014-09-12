'use strict';

var mainApp = angular.module('mainApp', [
    'LocalStorageModule',
    'ngRoute',
    'myAppServices',
    'mainAppControllers'
]);

mainApp.factory('sessionInjector', ['localStorageService', function(localStorageService) {
    var sessionInjector = {
        request: function(config) {

            if(localStorageService.get("auth_token")!=null)
                config.headers['authorization'] = 'Bearer '+localStorageService.get("auth_token");

            return config;
        }
    };
    return sessionInjector;
}]);

mainApp.config(['$routeProvider','$httpProvider',
    function($routeProvider,$httpProvider) {


        //var auth_token = localStorageServiceProvider.get("auth_token");

        //$httpProvider.defaults.headers.common.Authorization = 'Bearer '+auth_token;

        //$httpProvider.defaults.headers.common['X-CSRFToken'] = "Ciccio";

        $httpProvider.interceptors.push('sessionInjector');


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

/*mainApp.config(['$httpProvider', function($httpProvider) {

    $httpProvider.interceptors.push(function($q) {
        return {
            'request': function(config) {
                // same as above
            },

            'response': function(response) {
                // same as above
            }
        };
    });


}]);*/

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