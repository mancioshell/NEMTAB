/*
 * Serve JSON to our AngularJS client
 */
var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/fantacalcio';
var connection = mongoose.createConnection(dbURI,{ server: { poolSize: 5 } });

var usersSchema = require('../models/users');
var Users = connection.model('Users', usersSchema);


// CONNECTION EVENTS
// When successfully connected
connection.on('connected', function () {
    console.log('Mongoose connection open to ' + dbURI);
});

// If the connection throws an error
connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});



exports.register = function(req,res){

    var body = req.body;

    Users.findOne({ name: body.username}, function (err, findUser) {
        if(findUser==null){
            var user = new Users({ name: body.username,
                password:body.password, leagues: [] })
            user.save(function (err, user) {
                if (err)
                    console.log(err)

                res.end()
            });
        }else{
            res.send(403, 'Username already in use');
        }
    });

};

exports.login = function(req,res){

    var body = req.body;

    Users.findOne({ name: body.username,
        password: body.password},function (err, users) {

        if (err){
            console.log(err)
            res.send(500, 'Internal Server Error');
        }

        if(users!=null){
            req.session.loggedIn = true;
            req.session.user = body.username;
            console.log("Find ok...")
            console.log(users)
            res.json({
                users : users
            })
        }else{
            console.log("Find ERROR...")
            res.send(401, 'Username or password is invalid');
        }
    });

};

exports.logout = function(req,res){
    req.session.loggedIn = false;
    req.session= null;
    res.end()
};

