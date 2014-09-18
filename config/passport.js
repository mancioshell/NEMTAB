// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var BearerStrategy   = require('passport-http-bearer').Strategy;
var uuid = require('node-uuid');
var moment = require('moment');

module.exports = function(passport,models) {

    var User = models.user;

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

    passport.use('local-login',new LocalStrategy(
        function(username,password,done) {

            User.findOne({ username: username,
                password: password
            },function (err, user) {

                if (err){
                    return done(err);
                }

                if (!user){
                    return done(null, false);
                }
                user.token.auth_token = uuid.v1();
                user.token.createDate = moment();

                user.save(function(err,user){
                    if (err){
                        return done(err);
                    }
                    return done(null, user);
                });

            });
        }
    ));

    passport.use('local-authorization',new BearerStrategy(
        function(token, done) {

            console.log(token);

            User.findOne({ 'token.auth_token' : token }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    console.log(user);
                    return done(null, false);
                }
                if (user.hasExpired()) {
                    return done(null, false);
                }
                return done(null, user, { scope: 'all' });
            });
        }
    ));

}
