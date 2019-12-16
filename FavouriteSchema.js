let mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

let favouriteSchema = new mongoose.Schema(
  {
    idUser: {
      type: ObjectID,
      required: [true, 'idUser is required']
    },
    idItinerary: {
      type: ObjectID,
      required: [true, 'idItinerary is required']
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('Favourite', favouriteSchema, 'favourites');
