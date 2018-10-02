const cats = require('./cats');
const faker = require('faker');
const fs = require('fs');
// const stringify = require('csv-stringify');

// const numToGenerate = 1000000;

var data = function (numToGenerate) {
var results = [];
  for (var i = 1; i < numToGenerate; i++ ) {
    const listPrice = parseInt(faker.commerce.price() / 9, 10);
    const productPrice = listPrice * (randomNumFromRange(80, 95) / 100);
    const usedP = productPrice * (randomNumFromRange(50, 95) / 100);
    const categoryObj = variations[Math.round(Math.random())];
    const variations = [
      {
        category: 'color',
        data: ['Medium Spring Green', 'Coral', 'Lawn Green'],
      }, {
        category: 'size',
        data: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      },
    ];

    function truncateToDecimalPlace(num, places) {
      let placesCopy = places || 0;
      placesCopy = 10 ** placesCopy;
      return Math.round(num * placesCopy) / placesCopy;
    };

    function randomNumFromRange(
      lowerBound, upperBound, growthRate, decimalPlaces
    ) {
      let growthRateCopy;
      if (growthRate === undefined || growthRate === 'exp') {
        // more low numbers
        growthRateCopy = 2;
      } else if (growthRate === 'log') {
        // more high numbers. a higher denominator means on average higher nums are generated
        growthRateCopy = 1 / 1.5;
      }
      return truncateToDecimalPlace((Math.random() ** growthRateCopy)
            * (upperBound - lowerBound) + lowerBound, decimalPlaces);
    };
    
    var obj = {
      productID: i,
      productName: "shirt"+i,
      companyName: "company"+i,
      ratingsAverage: randomNumFromRange(0.5, 5, 'log', 1),
      questionsCount: randomNumFromRange(5, 1000),
      amazonsChoice: randomNumFromRange(0, 1),
      categoryName: faker.commerce.department(),
      priceList: listPrice,
      price: productPrice,
      freeReturns: randomNumFromRange(0, 1),
      free_shipping: randomNumFromRange(0, 1),
      sold_byName: faker.company.companyName(),
      available: randomNumFromRange(0, 1, 'log'),
      hasCountdown: randomNumFromRange(0, 1),
      description: faker.lorem.lines().replace(/\n/g, '\\n'),
      usedCount: randomNumFromRange(1, 20),
      usedPrice: usedP,
      var_key: categoryObj ? categoryObj.category : '',
      var_value: categoryObj ? categoryObj.data[i] : '',
      imageURL: cats.data[i % cats.data.length],
    }
    results.push(obj);
    // console.log(results)
    console.log(i)
  }
var stringifiedResults = JSON.stringify(results);
// console.log('this is stringified results', stringifiedResults)
fs.appendFile(`data1.json`, stringifiedResults, 'utf8', (err) => {
  if (err) throw err;
  console.log('the file has been saved')
});
}




var output = data(2000000);


