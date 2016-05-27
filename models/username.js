var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
	name: String,
  email: String,
  makemodel: String,
  plate: String,
  sticker: String,
	linkSession: {type: String, ref: 'Session'},
	linkedSpot: { type: Schema.Types.ObjectId, ref: 'ParkingSpot' }
});

var Account = mongoose.model('Account', AccountSchema);

module.exports = Account
