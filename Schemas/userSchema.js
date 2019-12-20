let mongoose = require('mongoose');
var primeraLetraAMayuscula = require('../funciones.js').primeraLetraAMayuscula;
const validator = require('validator');
const bcrypt = require('bcryptjs');
var ObjectID = require('mongodb').ObjectID;

let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required']
    },
    email: {
      type: String,
      required: [true, 'email valid is required'],
      validate: value => {
        return validator.isEmail(value);
      }
    },
    password: {
      type: String,
      min: [6, 'Password very short'],
      set: value => hashPassword(value)
    },
    photoURL: {
      type: String
    },
    firstName: {
      type: String,
      required: [true, 'first name is required'],
      set: value => primeraLetraAMayuscula(value),
      validate: value => {
        return value != '';
      }
    },
    lastName: {
      type: String,
      required: [true, 'last name is required'],
      set: value => primeraLetraAMayuscula(value),
      validate: value => {
        return value != '';
      }
    },
    country: {
      type: String,
      set: value => primeraLetraAMayuscula(value),
      validate: value => {
        return value != '';
      }
    },
    favourites: {
      type: [ObjectID]
    }
  },
  {
    versionKey: false
  }
);

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}
module.exports = mongoose.model('User', userSchema, 'users');
