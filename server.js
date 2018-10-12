const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const pg = require("pg");
const newRelic = require("newrelic");
const app = express();
const {deleteProduct, updateProduct, getProduct, postProduct} = require('./database/db.js');
const redisClient = require('./redisConnect.js')


app.use('/loaderio-be963b3932487b936e769094b8e69ce8', (req, res) => {
        res.sendFile(__dirname + '/loaderio-be963b3932487b936e769094b8e69ce8.txt');
})

const corsOptions = {
  origin: 'http://localhost:9002',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// app.use(bodyParser.json();
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/', express.static(path.join(__dirname, '/client/dist')));

app.get('/get', (req, res) => {
  // console.log("got here!")
  // console.log("requessst", req.query.id);
  // req.query is the URL query string, and 'id' is the product id i wish to fetch
  redisClient.get(req.query.id, function(err, data){ //making the request to redis and it gets it back as data 
    if(err) throw err;
    if(data != null) {
      var dataFromRedis = JSON.parse(data);
      const { productname, sellername, ratingsaverage, ratingscount, questionscount, amazonschoice, categoryname, pricelist, price, freereturns, freeshipping, soldbyname, available, hascountdown, description, usedcount, usedprice, id, varkey, varvalue, imageurl } = dataFromRedis.rows[0];
      var camelCaseData = 
      { productName: productname,
        sellerName: sellername,
        ratingsAverage: ratingsaverage,
        ratingsCount: ratingscount,
        questionsCount: questionscount,
        amazonsChoice: amazonschoice,
        categoryName: categoryname,
        priceList: pricelist,
        price,
        freeReturns: freereturns,
        freeShipping: freeshipping,
        soldByName: soldbyname,
        available,
        hasCountdown: hascountdown,
        description,
        usedCount: usedcount,
        usedPrice: usedprice,
        id,
        varKey: varkey,
        varValue: varvalue,
        imageUrl: imageurl 
      }
      console.log(dataFromRedis.rows)
      res.send(camelCaseData) //put it in the format you want and send it
    }
    else {

  getProduct(req.query.id, (data) => { //else go into DB
    res.header('Access-Control-Allow-Origin', '*');
    const { productname, sellername, ratingsaverage, ratingscount, questionscount, amazonschoice, categoryname, pricelist, price, freereturns, freeshipping, soldbyname, available, hascountdown, description, usedcount, usedprice, id, varkey, varvalue, imageurl } = data.rows[0];
    // console.log('this is data.rows', data.rows)
      var reshapedData = 
      { productName: productname,
        sellerName: sellername,
        ratingsAverage: ratingsaverage,
        ratingsCount: ratingscount,
        questionsCount: questionscount,
        amazonsChoice: amazonschoice,
        categoryName: categoryname,
        priceList: pricelist,
        price,
        freeReturns: freereturns,
        freeShipping: freeshipping,
        soldByName: soldbyname,
        available,
        hasCountdown: hascountdown,
        description,
        usedCount: usedcount,
        usedPrice: usedprice,
        id,
        varKey: varkey,
        varValue: varvalue,
        imageUrl: imageurl 
      }
    res.send(reshapedData);
    // return data.rows[0];
  }
  )
}})
});

app.post('/post', bodyParser(), (req, res) => {
  // console.log('this is req.body', req.body)
  postProduct(req.body, (err, results) => {
    if (err) {
      console.log('erroring in post', err)
      res.status(500) 
      } else {
      // console.log('this is post request data', req.body)
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