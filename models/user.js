var mongoose = require('mongoose');

var Model = function(connection) {

    var userSchema = new mongoose.Schema({
        username: String,
        password: String,
        auth_token : {
            created_at : {type: Date, default: null},
            value : {type: String, default: null}
        }

    });

    this.user = connection.model('User', userSchema);

}

module.exports = Model;




