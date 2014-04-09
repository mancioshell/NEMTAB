var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var user = {
    "username":"alessandro",
    "password":"password"
}

passport.use(new LocalStrategy(
    function(username, password, done) {

        return done(null, user);

    }
));

// Views Route

exports.index = function(req, res){
  res.render('index');
};

exports.partial = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};


// Apis Routes

exports.login = passport.authenticate('local'),function(req,res){

    var body = req.body;

    console.log(body.username+" "+body.password)

};




/*
exports.webapp = function(req, res){
    res.render('webapp');
};


*/