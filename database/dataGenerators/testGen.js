// var fs = require('fs');
// const faker = require('faker');
// const randomName = () => { //productName
//   return faker.commerce.productName();
// };

// const randomDescription = () => { //productDescription
//   return faker.lorem.sentences();
// };

// const color = () => { //color
//   return faker.commerce.color();
// };

// const randomPrice = () => { //price
//   return faker.commerce.price();
// }


// const randomImage = () => { //imageURL 
//   const imageList = ['https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(1).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(10).jpeg',
//     'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(2).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(3).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(4).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(5).jpeg',
//     'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(6).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(7).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(8).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(9).jpeg'];
//   const item = imageList[Math.floor(Math.random() * imageList.length)];
//   return item;
// };

// const list = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]; //rating
// function getRandomRating() {
//   const rand = list[Math.floor(Math.random() * list.length)];
//   return rand;
// };

// const randomReviewNumber = () => { //reviewNumber
//   return Math.floor((Math.random() * 1000) + 36);
// };

// const randomBoolean = () => { //randomBoolean
//   return faker.random.boolean();
// }; 
// var counter = 1;
// var fileName = './jsonData' + counter + '.json';

// fs.writeFile(fileName, '[');

// for (var i = 0 ; i < 5000001 ; i++) { //keep a counter and once it hits 1 million make a new file... 
//  let productObject =  
//  {id: i + 1,
//  productName: "shirt" + (i + 1),
//  productDescription: faker.lorem.sentences(), 
//  color: faker.commerce.color(), 
//  price: faker.commerce.price(),
//  imageURL: randomImage(),
//  rating: getRandomRating(),
//  reviewNumber: randomReviewNumber(),
//  isPrime: faker.random.boolean()}

//  console.log("data entry #", i)
    
    
//    //writer = fs.createWriteStream(fileName, {'flags': 'a'});
    
//    fs.appendFile(productObject) //will write to the new file we just created using the newest product 
    
// };


const faker = require('faker');
var fs = require('fs');

console.time('Task completed in')
// var counter = 1;
// var fileName = `jsonData${counter}.json`

var looped = 1;
var currentIteration=1;
var max = 10;



function recurse(currentLoop) {

  if (currentLoop > max) {
    console.timeEnd('Task completed in')
  }
  if (currentLoop <= max) {
    let container = ''; 

    for (var i = 1; i <= 25; i++) { //keep a counter and once it hits 1 million make a new file... 
    
      var productObject = {
        id: currentIteration,
        productName: "shirt" + currentIteration,
        productDescription: faker.lorem.sentences(), 
        color: faker.commerce.color(), 
        price: faker.commerce.price(),
        imageURL: randomImage(),
        rating: getRandomRating(),
        reviewNumber: randomReviewNumber(),
        isPrime: faker.random.boolean(),
      }
        currentIteration++;
        productObject = JSON.stringify(productObject);
        container += productObject + ',' + '\n';
      }
      fs.appendFile('dataTest.json', container, (err) => {
        if (err) {console.log(err)} 
          console.log(`current loop at ${currentLoop}`);
          looped++;
          recurse(looped);
      });
  }
}

fs.writeFile('dataTest.json', '[')
recurse(looped);
fs.appendFile('dataTest.json', ']')