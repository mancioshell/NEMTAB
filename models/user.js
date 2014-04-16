var mongoose = require('mongoose');

var Model = function(connection) {

    var tokenSchema = new mongoose.Schema({
        token: String,
        created_at: { type: Date, expires: '1.5m' }
    });

    var userSchema = new mongoose.Schema({
        username: String,
        password: String,
        auth_token: {type: mongoose.Schema.Types.ObjectId, ref: 'Token'}
    });

    this.token = connection.model('Token', tokenSchema);
    this.user = connection.model('User', userSchema);


}

module.exports = Model;




