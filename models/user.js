var mongoose = require('mongoose');

var Model = function(connection) {

    var tokenSchema = new mongoose.Schema({
        token: String,
        created_at: { type: Date, expires: 60 },
        user : {type: mongoose.Schema.Types.ObjectId, ref: 'Token'}
    });

    var userSchema = new mongoose.Schema({
        username: String,
        password: String
    });

    this.token = connection.model('Token', tokenSchema);
    this.user = connection.model('User', userSchema);


}

module.exports = Model;




