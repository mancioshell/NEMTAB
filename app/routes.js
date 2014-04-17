module.exports = function(app, uuid, connection) {

    var model = require('../models/user');
    var m = new model(connection);
    var User = m.user;
    var Token = m.token;

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/auth/home',function(req, res){
        res.render('webapp');
    });

    app.get('/partial/auth/:name', isLoggedIn, function (req, res) {
        var name = req.params.name;
        res.render('partials/auth/' + name);
    });

    app.get('/partial/:name', function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.post('/update',function(req, res) {
        var body = req.body;
        console.log(body.auth_token);
        Token.findOne({token: body.auth_token},function(err, token){

            if(err){
                res.send(500, 'Internal Server Error');
                res.end();
            }

            if(!token){
                res.send(403, 'Forbidden');
                res.end();
            }

            token.update({ created_at : new Date },function(err,rr){
                console.log(err,rr)
            });

        });

    });

    app.post('/authenticate',function(req, res) {
        var body = req.body;

        User.findOne({username: body.username, password: body.password},function (err, user) {

            if (err){
                console.log(err);
                res.send(500, 'Internal Server Error');
                res.end();
            }

            if (!user){
                console.log(token);

                console.log("Username non trovato");
                res.send(401, 'Wrong user or password');
                res.end();
            }else{

                Token.findOne({ })
                    .populate({
                        path: 'user',
                        match: { username: body.username, password: body.password}
                    }).exec(function (err, token){
                        console.log(token)

                        if (err){
                            console.log(err);
                            res.send(500, 'Internal Server Error');
                            res.end();
                        }

                        if (!token){
                            var tokenString = uuid.v4();

                            var newToken = new Token({ token: tokenString,
                                created_at : new Date,
                                user : user
                            });

                            newToken.save(function (err, user) {
                                if(err){
                                    console.log(err)
                                    res.send(500, 'Internal Server Error');
                                    res.end();
                                }
                            });

                        }else{
                            var tokenString = token.token;
                        }
                        res.json({ token: tokenString });
                        res.end();

                    });

            }

        });
    });

    app.post('/signup',function(req, res) {
        var body = req.body;

        if(body.password!=body.check_password){
            res.send(403, 'Password and Check Password must be the same!');
            res.end();
        }

        User.findOne({ username: body.username
        },function(err, user) {

            if (err){
                res.send(500, 'Internal Server Error');
                res.end();
            }

            if (user) {
                res.send(403, 'Username already exist!');
                res.end();
            }else {
                var newUser = new User({ username: body.username,password:body.password,auth_token:null})
                newUser.save(function (err, user) {
                    if (err){
                        res.send(500, 'Internal Server Error');
                        res.end();
                    }else{
                        res.send(200, 'Username is registered correctly!');
                        res.end();
                    }
                });
            }
        });

    });

    // process the signup form
    /*app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/#/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));*/


    app.get('/api/logout', isLoggedIn, function(req, res){
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

}
