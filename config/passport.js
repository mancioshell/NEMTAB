// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport) {

    var user = {
        "username":"alessandro",
        "password":"password",
        "id" : "dsasdsadas"
    }

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        done(false, user);
    });


    passport.use('local-login',new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req,username, password, done) {
            var body = req.body;
            console.log(body);
            return done(null, user);
        }
    ));

    passport.use('local-signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username , password, done) {
            var body = req.body;
            console.log(body);
            return done(null, user);
        }
    ));

}