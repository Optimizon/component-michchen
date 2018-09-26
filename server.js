require('dotenv').config();
const morgan = require('morgan');

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const db = require('./database/db.js');

const corsOptions = {
  origin: 'http://localhost:9002',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/', express.static(path.join(__dirname, '/client/dist')));
// app.use('/', express.static(__dirname + '/client/dist'));

app.get('/get', (req, res) => {
  // req.query is the URL query string, and 'id' is the product id i wish to fetch
  db.getProduct(req.query.id, (data) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(data);
    console.log('this is data', data)
  });
});

app.post('/get', (req, res) => {

})

app.get('/test', (req, res) => {
  res.send('test');
});

app.listen(9001, () => {
  console.log(`listening on ${9001}`);
});
