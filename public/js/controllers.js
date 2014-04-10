'use strict';
/* main App Controllers */

var mainAppControllers = angular.module('mainAppControllers', []);

mainAppControllers.controller('LoginCtrl', ['$scope', '$http','$window','$location',
    function ($scope, $http) {

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
]);


mainAppControllers.controller('RegistrationCtrl', ['$scope', '$http','$window','$location',
    function ($scope, $http) {


    }
]);


/* web App Controllers */


var webAppControllers = angular.module('webAppControllers', []);


webAppControllers.controller('HomeCtrl', ['$scope', '$http','$window','$location',
    function ($scope, $http) {


    }
]);