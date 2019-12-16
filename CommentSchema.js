let mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

let commentSchema = new mongoose.Schema(
  {
    idItinerary: {
      type: ObjectID,
      required: [true, 'id itinerary is required']
    },
    idUser: {
      type: ObjectID,
      required: [true, 'id User is required']
    },
    text: {
      type: String,
      required: [true, 'Text in the commment is required']
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('Comment', commentSchema, 'comments');
