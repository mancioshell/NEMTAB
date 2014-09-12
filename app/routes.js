module.exports = function(app, passport,models) {

    var api = require('./api.js')(models);

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/home',passport.authenticate('local-login', {
        session: false
    }),function(req, res){
        res.render('webapp');
    });

    app.get('/partial/auth/:name', passport.authenticate('local-login', {
        session: false
    }), function (req, res) {
        var name = req.params.name;
        res.render('partials/auth/' + name);
    });

    app.get('/partial/:name', function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.post('/api/login', showClientRequest, passport.authenticate('local-login', {
        session: false
    }),api.login);

    app.post('/api/signup', showClientRequest, api.signup);


    app.get('/api/logout', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.logout);

    function showClientRequest(req, res, next) {
        var request = {
            REQUEST : {
                HEADERS: req.headers,
                BODY : req.body
            }
        }
        console.log(request)
        return next();
    }
}