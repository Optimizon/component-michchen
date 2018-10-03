DROP KEYSPACE if EXISTS amazon;
CREATE KEYSPACE amazon WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 3 };

USE amazon;

DROP TABLE if EXISTS products;

CREATE TABLE products (
  productName text,
  sellerName text,
  ratingsAverage decimal,
  ratingsCount int,
  questionsCount int,
  amazonsChoice int,
  categoryName text,
  priceList decimal,
  price decimal,
  freeReturns boolean,
  freeShipping boolean,
  soldByName text,
  available int,
  hasCountdown int,
  description text,
  usedCount int,
  usedPrice decimal,
  productId int,
  varKey text,
  varValue text,
  imageUrl text,
  primary key (productId)
);  

COPY products (productName, sellerName, ratingsAverage, ratingsCount, questionsCount, amazonsChoice, categoryName, priceList, price, freeReturns, freeShipping, soldByName, available, hasCountdown, description, usedCount, usedPrice, productId, varKey, varValue, imageUrl) FROM 'database/data/csvData2.csv' WITH HEADER = TRUE AND DELIMITER = ',';
