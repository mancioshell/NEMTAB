
/**
 * Module dependencies
 */

var express = require('express');
var http = require('http');
var path = path = require('path');

var passport = require('passport')
var routes = require('./routes');

var vhost = 'nodejschat.local'


var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({key:"myKey",secret:"mySecret"}));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);


// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
    // TODO
};

// Routes
app.get('/', routes.index);
app.get('/partial/:name', routes.partial);

app.post('/api/login', routes.login);


express.vhost(vhost, app);

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + vhost+":"+server.address().port);
});

/*var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path')


function restrict(req, res, next) {
    if (req.session.loggedIn) {
        console.log("Session OK!");
        next();
    } else {
        req.session.error = 'Access denied!';
        console.log("Access denied!");
        res.redirect(301,'/');

        res.send();
    }
}



*/

/*
// Routes
app.get('/', routes.index);
app.get('/home', restrict,routes.webapp);
app.get('/partial/:name', routes.partial);

// JSON API
app.post('/api/register', api.register);
app.post('/api/login', api.login);
app.delete('/api/logout', restrict,api.logout);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

*/
