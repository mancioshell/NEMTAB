module.exports = function(connection) {

    var User = require('./user')(connection);

    return {
        user: User
    }
}