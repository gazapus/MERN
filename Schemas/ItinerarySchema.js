let mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

let itinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    validate: value => {
      return value != "";
    }
  },
  profilePic: {
    type: String,
  },
  authorName:{
    type: String
  },
  rating:{
    type: Number
  },
  duration:{
    type: Number
  },
  price: {
    type: Number
  },
  city: {
    type: ObjectID
  },
  hashtag: {
    type: Array
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Itinerary', itinerarySchema, 'itineraries');