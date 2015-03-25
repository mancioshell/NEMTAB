require.config({
    baseUrl: '../scripts',
    paths :{
        'app' : 'src/app',
        'controllers' : 'src/controllers',
        'services' : 'src/services',
        'angular' :'lib/angular/angular.min',
        'angularRoute' : 'lib/angular-route/angular-route.min',
        'angularLocalStorage' : 'lib/angular-local-storage/dist/angular-local-storage.min',
        'cryptojslib' : 'lib/cryptojslib/rollups/pbkdf2',
        'jquery' : 'lib/jquery/dist/jquery.min',
        'noty': 'lib/noty/js/noty/jquery.noty',
        'noty.themes.default': 'lib/noty/js/noty/themes/default',
        'noty.layouts.top': 'lib/noty/js/noty/layouts/top',
        'bootstrap' : 'lib/bootstrap/dist/js/bootstrap.min'
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