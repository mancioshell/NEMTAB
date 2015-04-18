define(['angular'], function (angular) {
    'use strict';

    var mainAppControllers = angular.module('mainAppControllers', []);
    mainAppControllers.controller('NavCtrl', ['$location', 'localStorageService', 'AuthenticationService', NavCtrl]);
    mainAppControllers.controller('LoginCtrl', ['$location', 'ResourceService' ,'cryptoJSService', 'localStorageService', LoginCtrl]);
    mainAppControllers.controller('RegistrationCtrl', ['ResourceService', 'cryptoJSService', RegistrationCtrl]);
    mainAppControllers.controller('HomeCtrl', ['ResourceService', 'data', HomeCtrl]);
    mainAppControllers.controller('PersonCtrl', ['ResourceService', PersonCtrl]);
    mainAppControllers.controller('ThingCtrl', ['ResourceService', ThingCtrl]);


    mainAppControllers.controller('ProvaCtrl', ['$scope', function ($scope) {

        $scope.user = "";

        $scope.printHello = function(){
            return "Hello World "+$scope.user;
        }

        }
    ]);


    function NavCtrl($location, localStorageService, AuthenticationService)
    {
        var vm = this;
        vm.$location = $location;
        vm.localStorageService = localStorageService;
        vm.isAuthenticated = AuthenticationService.isLogged()
    }

    NavCtrl.prototype.logout = function ()
    {
        var vm = this;
        vm.localStorageService.clearAll();
        vm.$location.path("/login");
    };



    function LoginCtrl ($location, ResourceService, CryptoJS, localStorageService)
    {
        var vm = this;
        vm.$location = $location;
        vm.ResourceService = ResourceService;
        vm.CryptoJS = CryptoJS;
        vm.localStorageService = localStorageService;

        vm.failed_login = "";
    }

    LoginCtrl.prototype.submit = function()
    {
        var vm = this;
        var salt = vm.username;
        var enc_password = CryptoJS.PBKDF2(vm.password, salt, { keySize: 256/32 });

        var user = {"username": vm.username, "password": enc_password.toString()};

        if(vm.username!==undefined || vm.password !==undefined){

            vm.ResourceService.login(user).then(function(data){
                vm.localStorageService.set("auth_token",data.auth_token);
                vm.$location.path("/home");
            },function(data, status) {
                if(status===401){
                    noty({text: 'Wrong username and/or password!',  timeout: 2000, type: 'error'});
                }else{
                    noty({text: data,  timeout: 2000, type: 'error'});
                }
            });

        }else{
            noty({text: 'Username and password are mandatory!',  timeout: 2000, type: 'error'});
        }
    };

    function RegistrationCtrl (ResourceService, CryptoJS)
    {
        var vm = this;
        vm.ResourceService = ResourceService;
        vm.CryptoJS = CryptoJS;
    }

    RegistrationCtrl.prototype.signup = function()
    {
        var vm = this;
        var salt = vm.username;

        var enc_password = CryptoJS.PBKDF2(vm.password, salt, { keySize: 256/32 });
        var enc_check_password = CryptoJS.PBKDF2(vm.check_password, salt, { keySize: 256/32 });

        var user = {"username": vm.username, "password": enc_password.toString(), "check_password" : enc_check_password.toString() };

        if(vm.username!==undefined || vm.password !==undefined || vm.check_password !==undefined){
            if(vm.password !== vm.check_password){
                noty({text: 'password and check_password must be the same!',  timeout: 2000, type: 'warning'});
            }else{
                vm.ResourceService.signup(user).then(function(){
                    noty({text: "Username is registered correctly!",  timeout: 2000, type: 'success'});
                    vm.username = null;
                    vm.password = null;
                    vm.check_password = null;
                },function(data) {
                    noty({text: data.message,  timeout: 2000, type: 'error'});
                });
            }
        }else{
            noty({text: 'Username and password are mandatory!',  timeout: 2000, type: 'warning'});
        }
    };


    function HomeCtrl(ResourceService, data)
    {
        var vm = this;
        vm.ResourceService = ResourceService;
        vm.data = data;

        vm.people = data[0].people;
        vm.things = data[1].things;
    }

    HomeCtrl.prototype.updatePerson = function(index, modify)
    {
        var vm = this;
        var person = vm.people[index];

        if(modify){
            vm.people[index].modify=true;
        }else{
            vm.ResourceService.updatePerson(person).then(function(){
                vm.people[index].modify=false;
            },function(data, status) {
                if(status!==401){
                    noty({text: data,  timeout: 2000, type: 'error'});
                }
            });
        }
    };

    HomeCtrl.prototype.updateThing = function(index,modify)
    {
        var vm = this;
        var thing = vm.things[index];

        if(modify){
            vm.things[index].modify=true;
        }else{

            vm.ResourceService.updateThing(thing).then(function(){
                vm.things[index].modify=false;
            },function(data, status) {
                if(status!==401){
                    noty({text: data,  timeout: 2000, type: 'error'});
                }
            });
        }
    };

    HomeCtrl.prototype.deleteThing = function(index)
    {
        var vm = this;
        var thing = vm.things[index];

        vm.ResourceService.deleteThing(thing).then(function(){
            vm.things.splice(index, 1);
        },function(data, status) {
            if(status!==401){
                noty({text: data,  timeout: 2000, type: 'error'});
            }
        });
    };

    HomeCtrl.prototype.deletePerson = function(index)
    {
        var vm = this;
        var person = vm.people[index];

        vm.ResourceService.deletePerson(person).then(function(){
            vm.people.splice(index, 1);
        },function(data, status) {
            if(status!==401){
                noty({text: data,  timeout: 2000, type: 'error'});
            }
        });
    };

    function PersonCtrl(ResourceService) {
        var vm = this;
        vm.person = null;
        vm.ResourceService = ResourceService;
    }

    PersonCtrl.prototype.createPerson = function()
    {
        var vm = this;
        var person = {person: vm.person};

        vm.ResourceService.createPerson(person).then(function(data){
            vm.person = null;
            noty({text: data.message,  timeout: 2000, type: 'success'});
        },function(data, status) {
            if(status!==401){
                noty({text: data,  timeout: 2000, type: 'error'});
            }
        });
    };


    function ThingCtrl(ResourceService)
    {
        var vm = this;
        vm.thing = null;
        vm.ResourceService = ResourceService;
    }

    ThingCtrl.prototype.createThing = function()
    {
        var vm = this;
        var thing = {thing: vm.thing};

        vm.ResourceService.createThing(thing).then(function(data){
            vm.thing = null;
            noty({text: data.message,  timeout: 2000, type: 'success'});
        },function(data, status) {
            if(status!==401){
                noty({text: data,  timeout: 2000, type: 'error'});
            }
        });
    };

    return mainAppControllers;

});