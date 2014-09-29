/**
 * Module dependencies
*/
var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var http = require('http');
var path = path = require('path');
var uuid = require('node-uuid');

var vhost = 'nodejsapp.local'
var port     = process.env.PORT || 3000;
var ip     = process.env.IP || "localhost";

var app = express();

var connection = require('./config/database')(mongoose);
var models = require('./models/models')(connection);
require('./config/passport')(passport,models); // pass passport for configuration


app.configure(function() {
    // set up our express application
    app.set('port', port);
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms
    app.set('view engine', 'html'); // set up html for templating
    app.engine('.html', require('ejs').__express);
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname, 'public')));
    //app.use(express.session({ secret: 'keyboard cat' }));// persistent login sessions
    app.use(express.methodOverride());
    app.use(express.json());
    app.use(express.urlencoded());
    //app.use(flash()); // use connect-flash for flash messages stored in session

    //passport configuration
    app.use(passport.initialize());
    //app.use(passport.session());// persistent login sessions
    //provagg
    app.use(app.router); //init routing

});

require('./app/routes.js')(app, passport,models); // load our routes and pass in our app and fully configured passport

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
    // TODO
};

//express.vhost(vhost, app);

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + vhost+":"+server.address().port);
});