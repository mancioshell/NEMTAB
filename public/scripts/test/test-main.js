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
        'angularAnimate' : 'lib/angular-animate/angular-animate.min',
        'angularMock' :'lib/angular-mocks/angular-mocks',
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
        'angularMock' :{
            deps: ['angular'],
            exports : 'angularMock'
        },
        'bootstrap' : ['jquery']
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
