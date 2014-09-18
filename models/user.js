var mongoose = require('mongoose');
var moment = require('moment');
var expired_time = 60;

module.exports = function(connection) {

    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        username: String,
        password: String,
        email: String,
        token : {
            auth_token: String,
            createDate: {type: Date, required: true, default: moment()}
        }

    });

    userSchema.methods.hasExpired = function() {
        return (moment().diff(this.token.createDate, 'minutes')) > expired_time;

    };

    var User = connection.model('User', userSchema);


    return User;
}




