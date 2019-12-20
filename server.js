const express = require('express');
const app = express();
var router = express.Router();
var mongoose = require('mongoose');
const City = require('./Schemas/citySchema');
const Itinerary = require('./Schemas/ItinerarySchema');
const User = require('./Schemas/userSchema');
const Favourite = require('./Schemas/FavouriteSchema');
const Comment = require('./Schemas/CommentSchema');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
var ObjectID = require('mongodb').ObjectID;
const keys = require('./keys');
const jwt_decode = require('jwt-decode');

const port = process.env.PORT || 5000;
app.listen(5000, function() {
  console.log('connected to port ' + port);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(passport.initialize());
app.use(passport.session()); //?

require('./passport');
require('./passportGoogle');

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

mongoose.connect(keys.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'cities'
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('connected to the data base');
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

app.get('/itineraries/:id', async (req, res) => {
  let id = ObjectID(req.params.id);
  let itinerary = await Itinerary.findById(id);
  if (!itinerary) {
    return console.error('error');
  }
  res.send(itinerary);
});

app.get('/itinerariesByCity/:cityId', async (req, res) => {
  let id = ObjectID(req.params.cityId);
  let city = await City.findById(id);
  Itinerary.find({ city: city.id }, (err, docs) => {
    if (err) throw err;
    res.send(docs);
  });
});

app.get('/city/:id', (req, res) => {
  let id = ObjectID(req.params.id);
  /*let city = await City.findById(id);
  console.log(city);
  if (!city) {
    return res.status(500).send('Error al cargar ciudad');
  }
  return res.send(
    city
  );*/
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

app.post('/users/register', async (req, response) => {
  let userExist = await User.findOne({ username: req.body.username });
  if (userExist) {
    return response.status(500).send('Username is already being used');
  }
  let emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return response
      .status(500)
      .send('Email is already being used for another account');
  }
  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    country: req.body.country,
    photoURL: req.body.photoURL,
    favourites: []
  });
  newUser.save(function(err, res) {
    if (err) {
      return response.status(500).send('The user cant be saved');
    }
    return response.send(res);
  });
});

app.post('/users/login', async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(500).send('User doesnt exist');
  }
  let passwordMatch = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordMatch) {
    return res.status(500).send('Password doesnt match');
  }
  const payload = {
    id: user._id,
    username: user.username,
    photoURL: user.photoURL
  };
  const options = { expiresIn: 240044 };

  jwt.sign(payload, keys.secretSign, options, async (err, token) => {
    if (err) {
      res.json({
        success: false,
        token: 'Error with the token'
      });
    } else {
      await user.updateOne({ isOnline: true });
      res.json({
        success: true,
        token: token
      });
    }
  });
});

app.delete('/users/clear', (req, res) => {
  User.deleteMany({}, function(err) {
    if (err) return handleError(err);
    else return res.send('all deleted');
  });
});

app.delete('/users/delete', async (req, res) => {
  let userDeleted = await User.deleteOne({ username: req.body.username });
  if (userDeleted.deletedCount > 0) {
    res.send('user deleted');
  } else {
    res.status(500).send('Cant be deleted');
  }
});

app.get(
  '/users/profile',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/error'
  }),
  (req, res) => {
    User.findById(req.user._id, (err, user) => {
      if (err)
        return res
          .status(500)
          .send('Error to get data from the data base profile');
      return res.send(user);
    });
  }
);

app.get('/users/get/:idUser', (req, res) => {
  User.findById(req.params.idUser, (err, user) => {
    if (err)
      return res
        .status(500)
        .send('Error to get data from the data base iduser');
    let userData = {
      id: user._id,
      username: user.username,
      photoURL: user.photoURL
    };
    return res.send(userData);
  });
});

app.get('/error', (req, res) => {
  console.log('error autentificacion');
  return res.status(500).send('Sesion expirada');
});

app.get(
  '/users/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/users/google/redirect',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/LogIn'
  }),
  async (req, res) => {
    const payload = {
      id: req.user._id,
      username: req.user.username,
      photoURL: req.user.photoURL
    };
    const options = { expiresIn: 2592000 };
    token = jwt.sign(payload, 'secret', options);
    res.redirect('http://localhost:3000/loging/' + token);
  }
);

app.post(
  '/favourites/update/:idItinerary',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: './error'
  }),
  async (req, response) => {
    let itinerary = await Itinerary.findById(req.params.idItinerary);
    if (!itinerary) {
      return response.status(500).send('Itinerary doesnt found');
    }
    let token = req.headers.authorization.split(' ')[1];
    let idUser = jwt_decode(token).id;

    let deleted = await Favourite.deleteOne({
      idUser: idUser,
      idItinerary: itinerary._id
    });
    if (deleted.deletedCount) {
      return response.send('removido');
    } else {
      let newFavourite = new Favourite({
        idUser: idUser,
        idItinerary: itinerary._id
      });
      newFavourite.save(function(err, res) {
        if (err) {
          return response.status(500).send('The favourite cant be saved');
        }
        return response.send(res);
      });
    }
  }
);

app.get(
  '/checkFavourite/:idItinerary',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: './error'
  }),
  async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    let isFavourite = await Favourite.findOne({
      idUser: jwt_decode(token).id,
      idItinerary: req.params.idItinerary
    });
    if (isFavourite) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  }
);

app.get('/getFavs', async (req, res) => {
  let favs = await Favourite.find({});
  res.send(favs);
});

app.post(
  '/comments/add',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/error'
  }),
  async (req, response) => {
    console.log(req.body);
    let token = req.headers.authorization.split(' ')[1];
    let idUser = jwt_decode(token).id;
    let newComment = new Comment({
      idUser: idUser,
      idItinerary: req.body.idItinerary,
      text: req.body.textComment
    });
    newComment.save((err, res) => {
      if (err) {
        return response.status(500).send('The comment cant be saved');
      } else {
        return response.send(res);
      }
    });
  }
);

app.get('/comments/all', async (req, res) => {
  let allComments = await Comment.find({});
  res.send(allComments);
});

app.put(
  '/comments/edit',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/error'
  }),
  async (req, response) => {
    let originalComment = await Comment.findById(req.body.idComment);
    originalComment.text = req.body.textComment;
    originalComment.save((err, res) => {
      if (err) {
        return response.status(500).send('The comment cant be edited');
      } else {
        return response.send(res);
      }
    });
  }
);

app.delete(
  '/comments/delete',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/error'
  }),
  (req, response) => {
    Comment.findByIdAndRemove(req.body.idComment, (err, res) => {
      if (err) {
        response.status(500).send('no se pudo eliminar comentario');
      }
      response.send(res);
    });
  }
);

app.get('/comments/:idItinerary', async (req, res) => {
  let allComments = await Comment.find({ idItinerary: req.params.idItinerary });
  res.send(allComments);
});

app.delete('/comments/delete/all', (req, res) => {
  Comment.deleteMany({}, function(err) {
    if (err) return handleError(err);
    else return res.send('all deleted');
  });
});

app.put('/cities/addPic', async (req, response) => {
  let cities = await City.find({});
  //PENDIENTE
  originalComment.save((err, res) => {
    if (err) {
      return response.status(500).send('The comment cant be edited');
    } else {
      return response.send(res);
    }
  });
});
