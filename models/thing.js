var mongoose = require('mongoose');

module.exports = function(connection) {

    var Schema = mongoose.Schema;

    var thingSchema = new Schema({
        name: String,
        size: Number
    });

    var Thing = connection.model('Thing', thingSchema);

    return Thing;
}
