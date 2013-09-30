var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    name: String,
    password: String,
    //leagues: [{ type: Schema.Types.ObjectId, ref: 'Leagues' }],
    //teams : [{ type: Schema.Types.ObjectId, ref: 'Teams' }]
})
// other virtual / static methods added to schema

module.exports = usersSchema;