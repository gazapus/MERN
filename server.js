const express = require('express');
const app = express();
var router = express.Router();
var mongoose = require('mongoose');
const City = require('./city')
const cors = require('cors');

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