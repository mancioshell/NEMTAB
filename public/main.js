require.config({
    baseUrl: 'bower_components',
    paths :{
        'app' : '../app/app',
        'controllers' : '../app/controllers',
        'services' : '../app/services',
        'angular' : 'angular/angular',
        'angular-route' : 'angular-route/angular-route',
        'angular-local-storage' : 'angular-local-storage/angular-local-storage',
        'cryptojslib' : 'cryptojslib/rollups/pbkdf2',
        'jquery' : 'jquery/dist/jquery.min',
        'noty': 'noty/js/noty/jquery.noty',
        'noty.themes.default': 'noty/js/noty/themes/default',
        'noty.layouts.top': 'noty/js/noty/layouts/top',
        'bootstrap' : 'bootstrap/dist/js/bootstrap.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route' :{
            deps: ['angular'],
            exports : 'angular-route'
        },
        'angular-local-storage' :{
            deps: ['angular'],
            exports : 'angular-local-storage'
        },
        'cryptojslib' : {
            exports : 'cryptojslib'
        },
        'noty': ['jquery'],
        'noty.themes.default': {
            deps: ['jquery', 'noty'],
            exports: 'jquery'
        },
        'noty.layouts.top': {
            deps: ['jquery', 'noty'],
            exports: 'jquery'
        },
        'bootstrap' : ['jquery']
    }
});


define(['require','angular','angular-route','angular-local-storage','cryptojslib','noty',
    'noty.themes.default','noty.layouts.top','bootstrap','app'], function (require,angular) {
    'use strict';
    require([], function () {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['mainApp']);
        });
    });

});
