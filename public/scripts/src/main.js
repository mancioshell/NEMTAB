require.config({
    baseUrl: '../scripts',
    paths :{
        'app' : 'src/app',
        'controllers' : 'src/controllers',
        'services' : 'src/services',
        'angular' :'lib/angular/angular.min',
        'angularRoute' : 'lib/angular-route/angular-route.min',
        'angularLocalStorage' : 'lib/angular-local-storage/dist/angular-local-storage.min',
        'angularAnimate' : 'lib/angular-animate/angular-animate.min',
        'angularToastr': 'lib/angular-toastr/dist/angular-toastr.tpls.min',
        'cryptojslib' : 'lib/cryptojslib/rollups/pbkdf2',
        'jquery' : 'lib/jquery/dist/jquery.min',
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
        'angularAnimate' :{
            deps: ['angular'],
            exports : 'angularAnimate'
        },
        'angularLocalStorage' :{
            deps: ['angular'],
            exports : 'angularLocalStorage'
        },
        'cryptojslib' : {
            exports : 'cryptojslib'
        },
        'angularToastr': {
            deps: ['angularAnimate'],
            exports: 'angularToastr'
        },
        'bootstrap' : ['jquery']
    }
});


require(['require','angular','bootstrap','app'], function () {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['mainApp']);
    });
});