var pg = require("pg");
var connectionString = "postgres://postgres@localhost:5432/amazon";

var client = new pg.Client(connectionString);
client.connect(function(err) {
  if(err) {
    return console.log(err)
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.log(err);
    }
    console.log(result.rows[0].theTime);
  })
});

const getProduct = (id, cb) => {
  // console.log('exports.getProduct');
  // console.log(`SELECT * FROM products WHERE id=${id}`);
// console.log('hi')
  client.query(`SELECT * FROM amazonproducts.products WHERE id=${id}`, (err, result) => {
    if(err) {
      console.error(err)
      cb(err)
    }
    // console.log('selected sucessfully from products');
    console.log(result);
      cb(result);
  });
};


const postProduct = (entry, cb) => {
  console.log('request recieved', entry["productname"])
  client.query(`INSERT INTO amazonproducts.products (productname, sellername, ratingsaverage, ratingscount, questionscount, amazonschoice, categoryname, pricelist, price, freereturns, freeshipping, soldbyname, available, hascountdown, description, usedcount, usedprice, id, varkey, varvalue, imageurl) 
    VALUES ('${entry["productname"]}', '${entry["sellername"]}', ${entry["ratingsaverage"]}, ${entry["ratingscount"]}, ${entry["questionscount"]}, '${entry["amazonschoice"]}', '${entry["categoryname"]}', ${entry["pricelist"]}, ${entry["price"]}, ${entry["freereturns"]}, ${entry["freeshipping"]}, '${entry["soldbyname"]}', ${entry["available"]}, ${entry["hascountdown"]}, '${entry["description"]}', ${entry["usedcount"]}, ${entry["usedprice"]}, ${entry["id"]}, '${entry["varkey"]}', '${entry["varvalue"]}', '${entry["imageurl"]}')`, cb)
}

const updateProduct = (id, entry, cb) => {
  var queryString =  `UPDATE amazonproducts.products SET productname = '${entry["productname"]}', sellername = '${entry["sellername"]}', categoryname = '${entry["categoryname"]}', price = ${entry["price"]}, soldbyname = '${entry["soldbyname"]}', available = ${entry["available"]}, description = '${entry["description"]}', imageurl = '${entry["imageurl"]}' WHERE id = ${id}`
  console.log('THIS IS THE QUERY!!!!!!!!!!!', queryString)
  client.query(queryString, cb)
}


const deleteProduct = (id, cb) => {
  client.query(`DELETE FROM amazonproducts.products where id = ${id}`, cb)
};


module.exports = {
  deleteProduct,
  updateProduct,
  getProduct,
  postProduct,
}