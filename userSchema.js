let mongoose = require('mongoose');
var primeraLetraAMayuscula = require('./funciones.js').primeraLetraAMayuscula;

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    set: value => primeraLetraAMayuscula(value),
    validate: value => {
      return value != "";
    }
  },
  email: {
    type: String,
    required: [true, "email is required"]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  url: {
    type: String
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('User', userSchema, 'users');