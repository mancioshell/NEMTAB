require.config({
    baseUrl: 'scripts/lib',
    paths :{
        'app' : '../app/app',
        'controllers' : '../app/controllers',
        'services' : '../app/services',
        'angular' :'angular/angular.min',
        'angularRoute' : 'angular-route/angular-route.min',
        'angularLocalStorage' : 'angular-local-storage/dist/angular-local-storage.min',
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
        'angularRoute' :{
            deps: ['angular'],
            exports : 'angularRoute'
        },
        'angularLocalStorage' :{
            deps: ['angular'],
            exports : 'angularLocalStorage'
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


require(['require','angular','angularRoute','angularLocalStorage','cryptojslib','noty',
    'noty.themes.default','noty.layouts.top','bootstrap','app'], function () {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['mainApp']);
    });
});