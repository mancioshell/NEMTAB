define(['angular','noty'], function (angular,noty) {
    'use strict';

    var myAppServices = angular.module('myAppServices', []);


    myAppServices.service('Resolver',['$q',
        function($q){
            return function(promises){
                return $q.all(promises);
            }
        }])

    myAppServices.service('ResourceService',['$q','$http',
        function($q,$http){

            var _promises = {};

            var _genericCallback = function(key, data){
                _promises[key] = data;
            };

            var _promisesGetter = function(method, URL, data, key, refresh){
                if(!refresh && _promises[key]!== undefined){
                    return $q.when(_promises[key]);
                }else{
                    return _ajaxRequest(method, URL, data, key);
                }
            }

            var _ajaxRequest = function(method, URL, data, key){
                var deferred = $q.defer();
                $http({method: method, url: URL, data:data}).
                    success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if(URL==="GET") _genericCallback(key,data);
                    }).
                    error(function(data, status, headers, config) {
                        deferred.reject(data);
                    }
                );
                return deferred.promise;
            }

            return {
                getPeople : function(refresh){
                    return _promisesGetter('GET','/api/people', null, "people", refresh);
                },
                getThings : function(refresh){
                    return _promisesGetter('GET','/api/things', null, "things", refresh);
                },
                createThing : function(thing){
                    return _ajaxRequest('POST', '/api/thing', thing, null);
                },
                createPerson : function(person){
                    return _ajaxRequest('POST', '/api/person', person, null);
                }


            }

        }]);



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




