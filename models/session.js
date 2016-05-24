var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
    queuePos: Number
});


var Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
