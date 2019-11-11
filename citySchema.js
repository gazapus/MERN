let mongoose = require('mongoose');
var primeraLetraAMayuscula = require('./funciones.js').primeraLetraAMayuscula;

let citySchema = new mongoose.Schema({
  city: {
    type: String,
    required: [true, "city name is required"],
    set: value => primeraLetraAMayuscula(value),
    validate: value => {
      return value != "";
    }
  },
  country: {
    type: String,
    required: [true, "country name is required"],
    set: value => primeraLetraAMayuscula(value),
    validate: value => {
      return value != "";
    }
  }
}, {
  versionKey: false
});

citySchema.methods.getInfo = function () {
  return this.city + ' from ' + this.country;
}

module.exports = mongoose.model('City', citySchema, 'cities');