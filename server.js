const express = require('express');
const app = express();
var router = express.Router();
var mongoose = require('mongoose');
const City = require('./citySchema');
const Itinerary = require('./ItinerarySchema');
const User = require('./userSchema');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
var ObjectID = require('mongodb').ObjectID;
//const { check, validationResult } = require('express-validator');

const port = process.env.PORT || 5000;
app.listen(port);
console.log('Conectado al puerto ' + port);
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/', router);

//passport middleware
app.use(passport.initialize());
require('./passport');

mongoose.connect(
  'mongodb+srv://cristian:abcd1234@cluster0-jc6tk.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'cities' }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('conectado a base de datos');
});

app.get('/getCities', (req, res) => {
  City.find(function(err, cities) {
    if (err) return console.error(err);
    res.send(cities);
  });
});

app.get('/getItineraries', (req, res) => {
  Itinerary.find(function(err, itineraries) {
    if (err) return console.error(err);
    res.send(itineraries);
  });
});

app.get('/itineraries/:id', (req, res) => {
  let id = ObjectID(req.params.id);
  db.collection('itineraries')
    .find(id)
    .toArray((err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    });
});

app.get('/itinerariesByCity/:cityId', (req, res) => {
  let id = ObjectID(req.params.cityId);
  db.collection('itineraries')
    .find({ city: id })
    .toArray((err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    });
});

app.get('/city/:id', (req, res) => {
  let id = ObjectID(req.params.id);
  db.collection('cities')
    .find(id)
    .toArray((err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    });
});

app.get('/activitiesByitinerary/:itineraryId', (req, res) => {
  let id = ObjectID(req.params.itineraryId);
  db.collection('activities')
    .find({ itinerary: id })
    .toArray((err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    });
});

app.get('/users/all', (req, res) => {
  User.find(function(err, users) {
    if (err) return console.error(err);
    res.send(users);
  });
});
/*
app.post(
  '/users/register',
  //Verificación que los datos se hayan ingresado sean correctos
  [
    check('email').isEmail(),
    check('password')
      .isLength({ min: 8 })
      .withMessage('must be at least 8 chars long'),
    check('name')
      .not()
      .isEmpty()
      .withMessage('must not be empty name')]
  */

app.post('/users/register', async (req, response) => {
  let userExist = await User.findOne({username: req.body.username});
  if(userExist){
    return response.status(500).send('Username is already being used');
  }
  let emailExist = await User.findOne({email: req.body.email});
  if(emailExist){
    return response.status(500).send('Email is already being used for another account');
  }
  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    country: req.body.country,
    photoURL: req.body.photoURL,
    isOnline: false
  });
  newUser.save(function(err, res) {
    if (err) {
      return response.status(500).send('The user cant be saved');
    }
    return response.send(res);
  });
});

app.post('/users/login', async (req, res) => {
  let user = await User.findOne({username: req.body.username});
  if(!user){
    return res.status(500).send('User doesnt exist');
  }
  let passwordMatch = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordMatch) {
    return res.status(500).send('Password doesnt match');
  }
  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
    lastName: user.lastName,
    firstName: user.firstName,
    country: user.country,
    photoURL: user.photoURL
  };
  const options = { expiresIn: 2592000 };
  jwt.sign(payload, 'secret', options, async (err, token) => {
    if (err) {
      res.json({
        success: false,
        token: 'Error with the token'
      });
    } else {
      await user.updateOne({isOnline: true});
      res.json({
        success: true,
        token: token
      })
    }
    })
  });
 

app.put('/users/logout',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
      User.findByIdAndUpdate(
        req.user._id, 
        {isOnline: 'false'}, 
        {new: true}, 
        (err, user) => {
          if(err){
            return res.status(500).send(err);
          }
          res.send(user);
      });
  }
);

app.delete('/users/clear', (req, res) => {
  User.deleteMany({}, function (err) {
    if (err) 
      return handleError(err);
    else 
      return res.send("all deleted");
  });
});

app.delete('/users/delete', async (req, res) => {
  let userDeleted = await User.deleteOne({username: req.body.username});
  if(userDeleted.deletedCount > 0){
    res.send("user deleted");
  }else{
    res.status(500).send("Cant be deleted");
  }
});

router.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {  
    db.collection('users')
      .findOne({ _id: req.user._id })
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(404).json({ error: 'User does not exist!' }));
  }
);

