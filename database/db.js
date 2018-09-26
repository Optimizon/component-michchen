const mysql = require('mysql');
console.log(process.env);
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'amazon',
  // port: 9001
});

// const con = mysql.createConnection({
//   host: 'hramazon.cwakgm40gffr.us-west-1.rds.amazonaws.com',
//   user: 'pikapoo',
//   password: '123password',
//   database: 'hramazon',
//   // port: 3306
// });


con.connect((err) => {
  // console.log('con.connect--------------------------------');
  if (err) {
    console.log('db.js > connection error', err);
  } else {
    console.log('connection success!');
  }
});

// for creating fake data (faker.js)
exports.resetTable = (table, cb) => {
  con.query(`DELETE FROM ${table};`, () => {
    console.log(`DELETED TABLE ${table}`);
    con.query(`ALTER TABLE ${table} AUTO_INCREMENT=1;`, () => {
      console.log(`RESET AUTO_INCREMENT for ${table}`);
      cb();
    });
  });
};

exports.insertRow = (query, cb) => {
  con.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      cb(res, con);
    }
  });
};

exports.getProduct = (id, cb) => {
  // console.log('exports.getProduct');
  // console.log(`SELECT * FROM products WHERE id=${id}`);

  con.query(`SELECT * FROM products WHERE id=${id}`, (err, result) => {
    // console.log('selected sucessfully from products');
    // console.log(result);
    const productObj = result[0];
    con.query(`SELECT * FROM images WHERE productId=${id}`, (error, res) => {
      const imgArr = {};
      for (let i = 0; i < res.length; i += 1) {
        // init category object if does not exist
        if (imgArr[res[i].varKey] === undefined) {
          imgArr[res[i].varKey] = {};
        }

        // init category object's value arr if does not exist
        if (imgArr[res[i].varKey][res[i].varValue] === undefined) {
          imgArr[res[i].varKey][res[i].varValue] = [];
        }

        // add image url to array
        imgArr[res[i].varKey][res[i].varValue].push(res[i].imageUrl);
      }

      if (productObj) {
        productObj.images = imgArr;
      }
      cb(productObj);
    });
  });
};

// exports.getProduct = (id, cb) => {
//   con.query(`SELECT * FROM images WHERE id=${id}`, (err, result) => {
//     cb(result);
//   })
// }
