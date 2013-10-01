'use strict';

/* Controllers */

function WebAppCtrl($scope, $http,$window,$location) {

    $scope.logout = function()
    {
        $http({method: 'DELETE', url: '/api/logout'}).
            success(function(data, status, headers, config) {
                console.log("logout!");
                $window.location.href="/";
            }).
            error(function(data, status, headers, config) {
                console.log(data);
            });
    }

}

WebAppCtrl.$inject = ["$scope","$http","$window","$location"];

function LoginCtrl($scope,$http,$window,$location) {
    $scope.failed_login = "";

    $scope.login = function()
    {

        var user = {"username": $scope.username, "password": $scope.password};

        if($scope.username!==undefined || $scope.password !==undefined){
            $http({method: 'POST', url: '/api/login', data:user}).
                success(function(data, status, headers, config) {
                    console.log(data);
                    $window.location.href="/home";
                }).
                error(function(data, status, headers, config) {
                    console.log(data);
                    noty({text: data,  timeout: 2000, type: 'error'});
                });
        }

    }
}
LoginCtrl.$inject = ["$scope","$http","$window","$location"];


function RegistrationCtrl($scope,$http) {
    $scope.register = function()
    {
        var user = {"username": $scope.username, "password": $scope.password, "check_password": $scope.check_password};

        if($scope.username!==undefined || $scope.password !==undefined || $scope.check_password !==undefined){

            if($scope.password!==$scope.check_password){

                noty({text: 'Password and Check Password must be the same!',  timeout: 2000, type: 'error'});

            }else{
                $http({method: 'POST', url: '/api/register', data:user}).
                    success(function(data, status, headers, config) {
                        console.log(data);
                    }).
                    error(function(data, status, headers, config) {

                        noty({text: data,  timeout: 2000, type: 'error'});

                    });
            }

        }


    }
}
RegistrationCtrl.$inject = ["$scope","$http"];
