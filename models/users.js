var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    name: String,
    password: String
})
// other virtual / static methods added to schema

module.exports = usersSchema;