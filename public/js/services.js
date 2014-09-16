'use strict';

/* Services */

var myAppServices = angular.module('myAppServices', []);

myAppServices.service('TokenInterceptor',
    function ($q, $window, localStorageService)
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
            }
        };
});

myAppServices.service('cryptoJSService',function(){
    console.log(CryptoJS)
    this.cryptoJS = CryptoJS;
})

myAppServices.service('AuthenticationService',function(localStorageService){
    return {
        isLogged: function()
        {
            var authenticated = false;
            if(localStorageService.get("auth_token")!==null)
                authenticated = true;

            return authenticated;
        }
    }
})




