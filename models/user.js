var mongoose = require('mongoose');

module.exports = function(connection) {

    var userSchema = new mongoose.Schema({
        username: String,
        password: String
    });

    var User = connection.model('User', userSchema);
    return User;
}




