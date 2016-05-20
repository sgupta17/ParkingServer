var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParkingSchema = new Schema({

  taken: Boolean,
  linkedStudent: {type: Schema.Types.ObjectId, ref: 'Account'}

});

var ParkingSpot = mongoose.model('ParkingSpot' , ParkingSchema);

module.exports = ParkingSpot;
