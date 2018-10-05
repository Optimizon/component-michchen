-- DROP DATABASE if EXISTS amazontest;
-- CREATE DATABASE amazontest;


DROP SCHEMA IF EXISTS amazonproducts cascade;

CREATE SCHEMA amazonproducts;
-- SET search_path TO amazonproducts;

CREATE TABLE amazonproducts.products (
  productname varchar(50) not null,
  sellername varchar(50) not null,
  ratingsaverage numeric(2,1),
  ratingscount int,
  questionscount int,
  amazonschoice int,
  categoryname varchar(255),
  pricelist int,
  price numeric(8,2),
  freereturns boolean,
  freeshipping boolean,
  soldbyname varchar(150),
  available int,
  hascountdown int,
  description text,
  usedcount int,
  usedprice numeric(6,2),
  id int,
  varkey varchar(150),
  varvalue varchar(150),
  imageurl varchar(255)
);

\COPY amazonproducts.products FROM './database/data/csvData.csv' WITH DELIMITER AS ',' CSV HEADER;
CREATE INDEX id ON amazonproducts.products (id);