var fs = require('fs');
const faker = require('faker');
const cats = require('../cats.js');
console.time('Task completed in');

var looped = 1;
var currentIteration = 1;
var maxLoop = 5;
var timesPerLoop = 25;


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


    var data = {
      products:[
      {productName: "shirt"+currentIteration,
      sellerName: "Alex Romanak"+currentIteration,
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
      productID: currentIteration,
      varKey: categoryObj ? categoryObj.category : '',
      varValue: categoryObj ? categoryObj.data[i] : '',
      imageURL: cats.data[i % cats.data.length]}]
    }
    currentIteration++;
    var json = data.products
    var fields = Object.keys(json[0])
    var replacer = function(key, value) { return value === null ? '' : value } 
    var csv = json.map(function(row){
      return fields.map(function(fieldName){
        return JSON.stringify(row[fieldName], replacer)
      }).join(',')
    })
    csv.unshift(fields.join(',')) // add header column

    console.log(csv.join('\r\n'))
    
    data = csv;
    bucket += csv + "," + "\n";
  }
  fs.appendFile('../csvDataTest.csv', bucket, (err) => {
    if (err) {console.error(err)}
      console.log(`current at loop #${currentLoop}`);
      looped++;
      retainer(looped);
  });
  }
}


  retainer(looped);

