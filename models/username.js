var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
	name: String,
  email: String,
  carMake: String,
  carModel: String,
  licensePlate: String,
  stickerNum: Number,
	linkedSpot: { type: Schema.Types.ObjectId, ref: 'ParkingSpot' }
});

var Account = mongoose.model('Account', AccountSchema);

module.exports = Account
