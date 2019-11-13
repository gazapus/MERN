const express = require('express');
const app = express();
var router = express.Router();
var mongoose = require('mongoose');
const City = require('./citySchema')
const Itinerary = require('./ItinerarySchema');
const cors = require('cors');
var ObjectID = require('mongodb').ObjectID;

const port = process.env.PORT || 5000;
app.listen(port);
app.use(cors());
console.log('Conectado al puerto ' + port);
app.use('/', router);

mongoose.connect('mongodb+srv://cristian:abcd1234@cluster0-jc6tk.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'cities' });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("conectado a base de datos");
});

app.get('/getCities', (req, res) => {

    City.find(function (err, cities) {
        if (err) return console.error(err);
        res.send(cities);
    });
});

app.get('/getItineraries', (req, res) => {

  Itinerary.find(function (err, itineraries) {
      if (err) return console.error(err);
      res.send(itineraries);
  });
});

app.get('/itineraries/:id', (req, res) => {
  let id = ObjectID(req.params.id);
  db.collection('itineraries').find(id).toArray( (err, results) => {
    if(err) {
      throw err;
    }
    res.send(results)
  });
});

app.get('/itinerariesByCity/:cityId', (req, res) => {
  let id = ObjectID(req.params.cityId);
  db.collection('itineraries').find({city: id}).toArray( (err, results) => {
    if(err) {
      throw err;
    }
    res.send(results)
  });
});

app.get('/city/:id', (req, res) => {
  let id = ObjectID(req.params.id);
  db.collection('cities').find(id).toArray( (err, results) => {
    if(err) {
      throw err;
    }
    res.send(results);
  });
});
