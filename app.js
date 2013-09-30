
/**
 * Module dependencies
 */

var express = require('express'),
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

var app = module.exports = express();

/**
* Configuration
*/

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({key:"fantacalcio",secret:"secret"}));
//app.use(express.session({key:"fantaclacio",secret:"secret"}));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
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
app.get('/home', restrict,routes.webapp);
app.get('/partial/:name', routes.partial);

// JSON API
app.post('/api/register', api.register);
app.post('/api/login', api.login);
app.delete('/api/logout', restrict,api.logout);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
* Start Server
*/

express.vhost('fantacalcio-calculator', app);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});