define(['angular','noty'], function (angular,noty) {
    'use strict';

    var myAppServices = angular.module('myAppServices', []);

    myAppServices.service('TokenInterceptor',['$q','$location','localStorageService',
        function ($q, $location, localStorageService)
        {
            return {
                request: function (config) {
                    config.headers = config.headers || {};

                    if(localStorageService.get("auth_token")!==null)
                        config.headers.Authorization = 'Bearer '+localStorageService.get("auth_token");

                    return config;
                },

                response: function (response) {
                    return response || $q.when(response);
                },
                responseError : function (response) {

                    console.log(response);

                    if(response.config.url!=="/api/login" && response.status===401){
                        localStorageService.clearAll();
                        $location.path("/login");
                        noty({text: "You have to perform signin to earned access to privileged resources!",  timeout: 2000, type: 'error'});
                    }

                    return $q.reject(response);

                }
            };
        }]);

    myAppServices.service('cryptoJSService',
        function(){
        return CryptoJS;
    })

    myAppServices.service('AuthenticationService',['localStorageService',function(localStorageService){
        return {
            isLogged: function()
            {
                var authenticated = false;
                if(localStorageService.get("auth_token")!==null)
                    authenticated = true;

                return authenticated;
            }
        }
    }])

    return myAppServices;
});




