define(['angular'], function (angular) {
    'use strict';

    var mainAppControllers = angular.module('mainAppControllers', []);

    mainAppControllers.controller('NavCtrl', ['$scope', '$http','$location','localStorageService','AuthenticationService',
        function ($scope, $http,$location,localStorageService,AuthenticationService) {


            $scope.isAuthenticated = AuthenticationService.isLogged()

            $scope.logout = function()
            {
                localStorageService.clearAll();
                $location.path("/login");
            }
        }
    ]);

    mainAppControllers.controller('LoginCtrl', ['$scope', '$http','$location', "cryptoJSService",'localStorageService',
        function ($scope, $http,$location,CryptoJS,localStorageService) {

            $scope.failed_login = "";

            $scope.submit = function()
            {
                var salt = $scope.username;
                var enc_password = CryptoJS.PBKDF2($scope.password, salt, { keySize: 256/32 });

                var user = {"username": $scope.username, "password": enc_password.toString()};

                if($scope.username!==undefined || $scope.password !==undefined){
                    $http({method: 'POST', url: '/api/login', data:user}).
                        success(function(data, status, headers, config) {

                            localStorageService.set("auth_token",data.auth_token);
                            $location.path("/home");

                        }).
                        error(function(data, status, headers, config) {
                            if(status===401){
                                noty({text: 'Wrong username and/or password!',  timeout: 2000, type: 'error'});
                            }else{
                                noty({text: data,  timeout: 2000, type: 'error'});
                            }
                        });
                }else{
                    noty({text: 'Username and password are mandatory!',  timeout: 2000, type: 'error'});
                }

            }

        }
    ]);


    mainAppControllers.controller('RegistrationCtrl', ['$scope', '$http','cryptoJSService',
        function ($scope, $http, CryptoJS) {

            $scope.signup = function()
            {
                var salt = $scope.username;

                var enc_password = CryptoJS.PBKDF2($scope.password, salt, { keySize: 256/32 });
                var enc_check_password = CryptoJS.PBKDF2($scope.check_password, salt, { keySize: 256/32 });

                var user = {"username": $scope.username, "password": enc_password.toString(), "check_password" : enc_check_password.toString() };

                if($scope.username!==undefined || $scope.password !==undefined || $scope.check_password !==undefined){

                    if($scope.password !== $scope.check_password){
                        noty({text: 'password and check_password must be the same!',  timeout: 2000, type: 'warning'});
                    }else{
                        $http({method: 'POST', url: '/api/signup', data:user}).
                            success(function(data, status, headers, config) {
                                noty({text: "Username is registered correctly!",  timeout: 2000, type: 'success'});
                                $scope.username = null;
                                $scope.password = null;
                                $scope.check_password = null;
                            }).
                            error(function(data, status, headers, config) {
                                noty({text: data.message,  timeout: 2000, type: 'error'});
                            });
                    }

                }else{
                    noty({text: 'Username and password are mandatory!',  timeout: 2000, type: 'warning'});
                }

            }

        }
    ]);



    mainAppControllers.controller('HomeCtrl', ['$scope', '$http',
        function ($scope, $http) {

            $http({method: 'GET', url: '/api/things'}).
                success(function(data, status, headers, config) {
                    $scope.things = data.things;
                }).
                error(function(data, status, headers, config) {

                    if(status!==401){
                        noty({text: data,  timeout: 2000, type: 'error'});
                    }
                });

            $http({method: 'GET', url: '/api/people'}).
                success(function(data, status, headers, config) {
                    $scope.people = data.people;
                }).
                error(function(data, status, headers, config) {
                    if(status!==401){
                        noty({text: data,  timeout: 2000, type: 'error'});
                    }
                });


            $scope.updatePerson = function(index,modify)
            {
                var person = $scope.people[index];

                if(modify){
                    $scope.people[index].modify=true;
                }else{

                    $http({method: 'PUT', url: '/api/person/'+person._id,data:{person: person}}).
                        success(function(data, status, headers, config) {
                            $scope.people[index].modify=false;
                        }).
                        error(function(data, status, headers, config) {
                            if(status!==401){
                                noty({text: data,  timeout: 2000, type: 'error'});
                            }
                        });
                }
            }

            $scope.updateThing = function(index,modify)
            {
                var thing = $scope.things[index];

                if(modify){
                    $scope.things[index].modify=true;
                }else{

                    $http({method: 'PUT', url: '/api/thing/'+thing._id,data:{thing: thing}}).
                        success(function(data, status, headers, config) {
                            $scope.things[index].modify=false;
                        }).
                        error(function(data, status, headers, config) {
                            if(status!==401){
                                noty({text: data,  timeout: 2000, type: 'error'});
                            }
                        });
                }
            }


            $scope.deleteThing = function(index)
            {

                var thing = $scope.things[index];

                $http({method: 'DELETE', url: '/api/thing/'+thing._id}).
                    success(function(data, status, headers, config) {
                        $scope.things.splice(index, 1);

                    }).
                    error(function(data, status, headers, config) {
                        if(status!==401){
                            noty({text: data,  timeout: 2000, type: 'error'});
                        }
                    });


            }

            $scope.deletePerson = function(index)
            {

                var person = $scope.people[index];

                $http({method: 'DELETE', url: '/api/person/'+person._id}).
                    success(function(data, status, headers, config) {
                        $scope.people.splice(index, 1);

                    }).
                    error(function(data, status, headers, config) {
                        if(status!==401){
                            noty({text: data,  timeout: 2000, type: 'error'});
                        }
                    });
            }


        }
    ]);


    mainAppControllers.controller('PersonCtrl', ['$scope', '$http',
        function ($scope, $http) {

            $scope.person = null;

            $scope.createPerson = function()
            {
                var person = {person: $scope.person};

                $http({method: 'POST', url: '/api/person',data:person}).
                    success(function(data, status, headers, config) {
                        $scope.person = null;
                        noty({text: data.message,  timeout: 2000, type: 'success'});
                    }).
                    error(function(data, status, headers, config) {
                        if(status!==401){
                            noty({text: data,  timeout: 2000, type: 'error'});
                        }
                    });
            }

        }
    ]);



    mainAppControllers.controller('ThingCtrl', ['$scope', '$http',
        function ($scope, $http) {

            $scope.thing = null;

            $scope.createThing = function()
            {
                var thing = {thing: $scope.thing};

                $http({method: 'POST', url: '/api/thing',data:thing}).
                    success(function(data, status, headers, config) {
                        $scope.thing = null;
                        noty({text: data.message,  timeout: 2000, type: 'success'});
                    }).
                    error(function(data, status, headers, config) {
                        if(status!==401){
                            noty({text: data,  timeout: 2000, type: 'error'});
                        }
                    });
            }

        }
    ]);

    return mainAppControllers;

});





