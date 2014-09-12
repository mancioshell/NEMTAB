'use strict';

/* Services */

var myAppServices = angular.module('myAppServices', []);

myAppServices.service('cryptoJSService',function(){
    console.log(CryptoJS)
    this.cryptoJS = CryptoJS;
})


/*myAppServices.service('myHttpInterceptor', function($q,localStorageService) {
    return {
        // optional method
        'request': function(config) {
            // do something on success
            return config;
        },

        // optional method
        'requestError': function(rejection) {
            // do something on error

            return $q.reject(rejection);
        },



        // optional method
        'response': function(response) {
            // do something on success
            console.log(localStorageService);
            console.log(localStorageService.get("auth_token"));
            console.log(response);
            //$http.defaults.headers.common.Authorization = 'Bearer '+response.data.auth_token;
            return response;
        },

        // optional method
        'responseError': function(rejection) {
            // do something on error
            console.log(localStorageService);
            console.log(localStorageService.get("auth_token"));


            return $q.reject(rejection);
        }
    };
});*/



