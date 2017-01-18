var mongoose = require('mongoose');
var Schema = mongoose.Schema;
timestamps = require('mongoose-timestamp');

var AccountSchema = new Schema({
	name: String,
  email: {
	type: String
	//unique: true	
  },
  makemodel: String,
  plate: String,
  sticker: String,
	linkSession: {type: String, ref: 'Session'},
	linkedSpot: Number
});

AccountSchema.plugin(timestamps);
var Account = mongoose.model('Account', AccountSchema);

module.exports = Account
