const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const pg = require("pg");

const app = express();
const {deleteProduct, updateProduct, getProduct, postProduct} = require('./database/db.js');

const corsOptions = {
  origin: 'http://localhost:9002',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// app.use(bodyParser.json();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/', express.static(path.join(__dirname, '/client/dist')));

app.get('/get', (req, res) => {
  // req.query is the URL query string, and 'id' is the product id i wish to fetch
  getProduct(req.query.id, (data) => {
    res.header('Access-Control-Allow-Origin', '*');
    console.log('this is data.rows', data.rows)
    res.send(data.rows[0]);
  });
});

app.post('/post', bodyParser(), (req, res) => {
  // console.log('this is req.body', req.body)
  postProduct(req.body, (err, results) => {
    if (err) {
      console.log('erroring in post', err)
      res.status(500) 
      } else {
      console.log('this is post request data', req.body)
      res.send('post success')
      }
    }
  );
})

app.delete('/get/:id', (req, res) => {
  const { id } = req.params;
  deleteProduct(id, (err, results) => {
    if (err) {
      console.log('error in delete')
      res.status(500).send(err)
    } else {
      res.send('1 product deleted')
    }
  })
})

app.put('/post/:id', bodyParser(), (req, res) => {
  const {id} = req.params;
  updateProduct(id, req.body, (err, results) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(`${id} updated!`)
    }
  })
})

app.listen(9001, () => {
  console.log(`listening on ${9001}`);
});