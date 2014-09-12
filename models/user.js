var mongoose = require('mongoose');

module.exports = function(connection) {

    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        username: String,
        password: String,
        email: String,
        auth_token: String
    });

    var User = connection.model('User', userSchema);

    return User;
}




