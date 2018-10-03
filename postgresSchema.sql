-- DROP DATABASE if EXISTS amazontest;
-- CREATE DATABASE amazontest;


DROP SCHEMA IF EXISTS amazonproducts cascade;

CREATE SCHEMA amazonproducts;
-- SET search_path TO amazonproducts;

CREATE TABLE amazonproducts.products (
  productame char(50) not null,
  sellername char(50) not null,
  ratingsaverage numeric(2,1),
  ratingscount int,
  questionscount int,
  amazonschoice int,
  categoryname char(255),
  pricelist int,
  price numeric(8,2),
  freereturns boolean,
  freeshipping boolean,
  soldbyname char(150),
  available int,
  hascountdown int,
  description text,
  usedcount int,
  usedprice numeric(6,2),
  productid int,
  varkey char(150),
  varvalue char(150),
  imageurl char(255)
);

\COPY amazonproducts.products FROM './database/data/csvData2.csv' WITH DELIMITER AS ',' CSV HEADER;
CREATE INDEX id ON amazonproducts.products (productid);