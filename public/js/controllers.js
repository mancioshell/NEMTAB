'use strict';
/* main App Controllers */

var mainAppControllers = angular.module('mainAppControllers', []);

mainAppControllers.controller('NavCtrl', ['$scope', '$http','$window','$location','localStorageService','AuthenticationService',
    function ($scope, $http,$window,$location,localStorageService,AuthenticationService) {


        $scope.isAuthenticated = AuthenticationService.isLogged()

        $scope.logout = function()
        {
            localStorageService.clearAll();
            $location.path("/login");
        }
    }
]);

mainAppControllers.controller('LoginCtrl', ['$scope', '$http','$window','$location', "cryptoJSService",'localStorageService',
    function ($scope, $http,$window,$location,cryptoJSService,localStorageService) {

        console.log(cryptoJSService.cryptoJS);

        $scope.failed_login = "";

        $scope.submit = function()
        {
            var user = {"username": $scope.username, "password": $scope.password};

            if($scope.username!==undefined || $scope.password !==undefined){
                $http({method: 'POST', url: '/api/login', data:user}).
                    success(function(data, status, headers, config) {

                        localStorageService.set("auth_token",data.auth_token);
                        $location.path("/home");

                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                        noty({text: data,  timeout: 2000, type: 'error'});
                    });
            }else{
                noty({text: 'Username and password are mandatory!',  timeout: 2000, type: 'error'});
            }

        }

    }
]);


mainAppControllers.controller('RegistrationCtrl', ['$scope', '$http','$window','$location',
    function ($scope, $http) {

        $scope.signup = function()
        {
            var user = {"username": $scope.username, "password": $scope.password, "check_password" : $scope.check_password};

            if($scope.username!==undefined || $scope.password !==undefined || $scope.check_password !==undefined){

                if($scope.password !== $scope.check_password){
                    noty({text: 'password and check_password must be the same!',  timeout: 2000, type: 'warning'});
                }else{
                    $http({method: 'POST', url: '/signup', data:user}).
                        success(function(data, status, headers, config) {
                            console.log(data);
                            noty({text: "Username is registered correctly!",  timeout: 2000, type: 'success'});
                        }).
                        error(function(data, status, headers, config) {
                            console.log(data);
                            noty({text: data,  timeout: 2000, type: 'error'});
                        });
                }

            }else{
                noty({text: 'Username and password are mandatory!',  timeout: 2000, type: 'warning'});
            }

        }

    }
]);



mainAppControllers.controller('HomeCtrl', ['$scope', '$http','$window','$location','localStorageService','AuthenticationService',
    function ($scope, $http,$window,$location,localStorageService,AuthenticationService) {

        $http({method: 'GET', url: '/api/things'}).
            success(function(data, status, headers, config) {
                $scope.things = data.things;
            }).
            error(function(data, status, headers, config) {
                console.log(data);
                noty({text: data,  timeout: 2000, type: 'error'});
            });

        $http({method: 'GET', url: '/api/people'}).
            success(function(data, status, headers, config) {
                $scope.people = data.people;
            }).
            error(function(data, status, headers, config) {
                console.log(data);
                noty({text: data,  timeout: 2000, type: 'error'});
            });


    }
]);




