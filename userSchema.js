let mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");
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
    required: [true, "password is required"],
    set: value => hashear(value)
  },
  url: {
    type: String
  }
}, {
  versionKey: false
});
/*
userSchema.pre('save', true, async function(next){
  let salt = await bcryptjs.genSalt(10);
  console.log(salt);
  let hash = await bcryptjs.hash(this.password, salt);
  console.log(hash);
  this.password = hash;
  console.log(this.password);
  return next()
});
*/
function hashear(password){
  console.log("ejecutando hasheo");
  bcryptjs.genSalt(10, function(err, salt) {
    bcryptjs.hash(password, salt, function(err, hash) {
        return hash;
    });
  });
}

module.exports = mongoose.model('User', userSchema, 'users');