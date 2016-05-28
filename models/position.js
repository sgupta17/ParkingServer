var mongoose = require('mongoose');
var Schema = mongoose.Schema;
timestamps = require('mongoose-timestamp');

var postionSchema = new Schema({
  pos: [{type: Schema.Types.ObjectId, ref: 'Account'}]
});

postionSchema.plugin(timestamps);
var Position = mongoose.model('Position', postionSchema);

module.exports = Position
