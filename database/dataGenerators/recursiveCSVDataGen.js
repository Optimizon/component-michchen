var fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream')
const cats = require('../cats.js');
console.time('Task completed in');

var looped = 1;
var currentIteration = 1;
var maxLoop = 40;
var timesPerLoop = 250000;


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

  var csvWrite = csvWriter({ headers: ["productName", "sellerName", "ratingsAverage", "ratingsCount", "questionsCount", "amazonsChoice", "categoryName", "priceList", "price", "freeReturns", "freeShipping", "soldByName", "available", "hasCountdown", "description", "usedCount", "usedPrice", "productId", "varKey", "varValue", "imageUrl"]});
  csvWrite.pipe(fs.createWriteStream('../data/csvData2.csv', {'flags': 'a'}));


function retainer(currentLoop) {
  
  if (currentLoop > maxLoop) {
    console.timeEnd('Task completed in');
  }
  if (currentLoop <= maxLoop) {
    let bucket = '';
    for (var i = 1; i <= timesPerLoop; i++ ) {
    const listPrice = parseInt(faker.commerce.price() / 9, 10);
    const productPrice = listPrice * (randomNumFromRange(80, 95) / 100);
    const usedP = productPrice * (randomNumFromRange(50, 95) / 100);
    const categoryObj = variations[Math.round(Math.random())];

    var data = [
      "shirt"+currentIteration,
      "Alex Romanak"+currentIteration,
      randomNumFromRange(0.5, 5, 'log', 1),
      randomNumFromRange(5, 1000),
      randomNumFromRange(2, 30, 'log'),
      randomNumFromRange(0, 1),
      faker.commerce.department(),
      listPrice,
      productPrice.toFixed(2),
      randomNumFromRange(0, 1),
      randomNumFromRange(0, 1),
      "Alex Romanak",
      randomNumFromRange(0, 1, 'log'),
      randomNumFromRange(0, 1),
      faker.lorem.lines(1),
      randomNumFromRange(1, 20),
      usedP.toFixed(2),
      currentIteration,
      categoryObj ? categoryObj.category : '',
      categoryObj ? categoryObj.data[i] : '',
      cats.data[i % cats.data.length]
      ]
    currentIteration++;
    bucket += data;
    csvWrite.write(data)

  }
    console.log(`at current#${currentLoop}`)
    looped++
    retainer(looped);
  }
}
  retainer(looped);

