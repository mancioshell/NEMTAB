// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport,connection) {

    var User = require('../models/user')(connection)

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('local-login',new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req,username, password, done) {
            var body = req.body;
            console.log(body)

            User.findOne({ username: body.username,
                            password: body.password
            },function (err, user) {

                if (err){
                    console.log(err);
                    return done(err);
                }

                if (!user){
                    console.log("Username non trovato");
                    //return done(null, false, req.flash('loginMessage', 'No user found.'));
                    return done(null, false);
                }

                // all is well, return successful user
                return done(null, user);

            });
        }
    ));

    passport.use('local-signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username , password, done) {
            var body = req.body;
            console.log(body);

            if(body.password!=body.check_password){
                var err = "Le password inserite dall'utente non corrispondono!";
                console.log(err);
                return done(null,false);
            }

            User.findOne({ username: body.username
            },function(err, user) {

                if (err)
                    return done(err);
                // check to see if theres already a user with that email
                if (user) {
                    console.log("Username gia esistente!!");
                    return done(null, false);
                }else {
                    var newUser = new User({ username: body.username,password:body.password})
                    newUser.save(function (err, user) {
                        if (err){
                            console.log(err);
                            return done(err);
                        }
                        return done(null, newUser);
                    });
                }
            });
        }
    ));

}
