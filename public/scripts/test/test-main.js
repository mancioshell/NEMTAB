var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/scripts',

    paths :{
        'app' : 'src/app',
        'controllers' : 'src/controllers',
        'services' : 'src/services',
        'angular' :'lib/angular/angular.min',
        'angularRoute' : 'lib/angular-route/angular-route.min',
        'angularLocalStorage' : 'lib/angular-local-storage/dist/angular-local-storage.min',
        'angularMock' :'lib/angular-mocks/angular-mocks',
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
        'angularMock' :{
            deps: ['angular'],
            exports : 'angularMock'
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
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
