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
const { check, validationResult } = require('express-validator');

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
db.on('error', console.error.bind(console, 'connection error:'));
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
      .withMessage('must not be empty name')
  ],
  (req, response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    //Verificar que el usuario no existe mediante su email
    db.collection('users')
      .find({ email: req.body.email })
      .toArray((err, results) => {
        if (err) {
          return console.error(err);
        }
        if (!results.length) {
          //Se crea y guarda el usuario nuevo
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(req.body.password, salt);
          var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            url: req.body.url
          });
          newUser.save(function(err, res) {
            if (err) {
              console.log(err);
              response.status(500).send('Something broke!');
            }
            response.send(res);
          });
        } else {
          response.statusMessage = 'Existe un usuario con este email';
          console.log('error 400');
          response.status(500).send('Something broke!');
        }
      });
  }
);

app.post(
  '/users/register2', (req, response) => {
    db.collection('users')
      .find({ email: req.body.email })
      .toArray((error, results) => {
        //Check if there an error in the server
        if (error) {
          response.status(500).send('Sorry, internal error :(');
        }
        //Check if the email already exists
        if (results.length) {
          response.status(500).send('User already exist!');
        }else{
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(req.body.password, salt);
          var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            country: req.body.country,
            photoURL: req.body.photoURL
          });
          newUser.save(function(err, res) {
            if (err) {
              response.status(500).send(err.message);
            }
            response.send(res);
          });
        } 
      })
  });

app.post('/users/login', (req, res) => {
  db.collection('users')
    .find({ email: req.body.email })
    .toArray((err, results) => {
      if (err) {
        return console.error(err);
      }
      if (results.length) {
        console.log('usuario encontrado');
        let passwordMatch = bcrypt.compareSync(
          req.body.password,
          results[0].password
        );
        if (passwordMatch) {
          const payload = {
            id: results[0]._id,
            name: results[0].name,
            email: results[0].email,
            avatarPicture: results[0].url,
            isOnline: results[0].isOnline
          };
          const options = { expiresIn: 2592000 };
          jwt.sign(payload, 'secret', options, (err, token) => {
            if (err) {
              res.json({
                success: false,
                token: 'There was an error'
              });
            } else {
              res.json({
                success: true,
                token: token
              });
            }
          });
        } else {
          console.log('contraseña incorrecta');
          res.status(500).send('password doesnt match!');
        }
      } else {
        console.log('no encontrado');
        res.status(500).send('That user doesnt exists!');
      }
    });
});

router.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user);
    db.collection('users')
      .findOne({ _id: req.user._id })
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(404).json({ error: 'User does not exist!' }));
  }
);
