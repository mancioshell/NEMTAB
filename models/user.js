var mongoose = require('mongoose');
var moment = require('moment');

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
        console.log("Sono dentro hasExpired");
        console.log(moment().diff(this.token.createDate, 'minutes'));
        return (moment().diff(this.token.createDate, 'minutes')) > 3;

    };

    var User = connection.model('User', userSchema);


    return User;
}




