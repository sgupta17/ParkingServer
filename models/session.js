var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
    _id: String
});


var Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
