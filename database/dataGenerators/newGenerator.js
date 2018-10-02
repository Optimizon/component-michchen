// const cats = require('./cats');
const faker = require('faker');
const fs = require('fs');

console.time('Task completed in');
var cats = ['http://www.petwebsite.co.uk/media/k2/items/cache/0548677e6432786dd8df61eb3aaec139_L.jpg',
'http://cutecatsinhats.com/wp-content/uploads/2016/01/first-birthday-kitten.jpg',
'http://www.pethealthnetwork.com/sites/default/files/styles/large/public/kittens-in-basket.jpg',
'http://www.catster.com/wp-content/uploads/2018/02/Cute-gray-tabby-kitten-finger-bite.jpg',
'http://www.petmania.ie/images/default-source/cat/petmania-kitten-1.jpg',
'http://www.petmd.com/sites/default/files/happy-healthy-kitten.jpg',
'http://animalalliancenyc.org/feralcats/wp-content/uploads/PhotoHead-KristaMenzel-DSC_7093.jpg',
'http://cdn.earthporm.com/wp-content/uploads/2015/08/cat-and-mini-me-counterpart-51__700.jpg',
'http://www.orphankittenrescue.com/~ASSETS/img/upload/Cauliflower.JPG',
'http://i0.kym-cdn.com/photos/images/newsfeed/001/327/699/014.jpg',
'http://catvills.com/wp-content/uploads/2017/08/Why-cat-bring-kittens-to-bed-f.jpg',
'http://www.petmd.com/sites/default/files/cats-kittens-92250862_0.jpg',
'http://www.bracpet.com/sites/default/files/cat-vaccinations.JPG',
'http://www.royalcanin.co.nz/var/royalcanin/storage/images/subsidiaries/nz/home/kitten-cat/kittens/kitten-care-and-training/16898960-7-eng-GB/kitten-care-and-training_articleV3.jpg',
'http://www.catster.com/wp-content/uploads/2017/12/A-gray-kitten-meowing.jpg',
'http://purrfectcatbreeds.com/wp-content/uploads/2016/05/male-vs-female-kittens.jpg',
'http://www.bandofcats.com/wp-content/uploads/2014/09/jade-kitten.jpg',
'http://pets-wiki.com/wp-content/uploads/2018/02/1500x500-e1517572751187.jpg',
'http://ochumanesociety.com/clients/3697/images/kittens.jpg',
'http://fixnation.org/wordpress/wp-content/uploads/2014/03/cats-kittens_00379052.jpg',
'http://www.tinykittens.com/uploads/cases/canada3.jpg',
'http://www.pethealthnetwork.com/sites/default/files/what-vaccines-does-my-new-kitten-need-175636241.jpg',
'http://boydsbengals.com/wp-content/uploads/2015/12/Available-Kitten.jpg',
'http://www.techwithkids.com/images/Little-Kitten-screenshot5.jpg',
'http://grza.net/GIS/Animals/Cats%20Kittens/Cat%20Kitten%20Fight.jpg',
'http://static.cdnbridge.com/resources/18/160536/picture/83/85898883.jpg',
'http://www.pethealthnetwork.com/sites/default/files/kitten-care162282356.png',
'http://hhforcats.org/wp-content/uploads/2017/12/TwistShout2_sml.jpg',
'http://www.villagevets.com/uploads/images/Belle1.jpg',
'http://cdn.earthporm.com/wp-content/uploads/2015/03/before-and-after-growing-up-cats-18__880.jpg',
'http://techwithkids.com/images/Little-Kitten-lead.jpg',
'http://lh5.ggpht.com/_QE_t15aYSqg/SrAEty_xaZI/AAAAAAAABt0/ZVwoZACK7ho/Huff-Heri200.jpg',
'http://www.valleycatsrescue.org/wp-content/uploads/2014/07/tom-tom1-980x460.jpg',
'http://raisinghappykittens.com/wp-content/uploads/2015/05/kitten-growth-chart-5-day-o.jpg'];
var looped = 1;
var currentIteration = 1;
var maxLoop = 2;
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
      productName: "shirt"+currentIteration,
      sellerName: "Alex Romanak"+currentIteration,
      ratingsAverage: randomNumFromRange(0.5, 5, 'log', 1),
      ratingsCount: randomNumFromRange(5, 1000),
      questionsCount: randomNumFromRange(2, 30, 'log'),
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
      imageURL: cats[i % cats.length],
    }
    currentIteration++;


    data = JSON.stringify(data);
    if (currentIteration === ((maxLoop * timesPerLoop)+1)) {
      bucket += data + "\n" + ']';
    } else {
      bucket += data + "," + "\n";
    }
  }
  fs.appendFile('../dataNew2.json', bucket, (err) => {
    if (err) {console.error(err)}
      console.log(`current at loop #${currentLoop}`);
      looped++;
      retainer(looped);
  });
  }
}

fs.writeFile('../dataNew2.json', '[', (err) => {
  if (err) {console.error(err)}
  retainer(looped);
})

// fs.appendFile('dataNew1.json', ']');

