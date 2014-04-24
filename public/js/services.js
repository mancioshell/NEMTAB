'use strict';

/* Services */

var myAppServices = angular.module('myAppServices', []);

myAppServices.service('cryptoJSService',function(){
    console.log(CryptoJS)
    this.cryptoJS = CryptoJS;
})

