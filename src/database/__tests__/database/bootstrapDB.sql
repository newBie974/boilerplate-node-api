-- Create table

DROP TABLE IF EXISTS customer;

-- Customer -----------------------------------

CREATE TABLE "customer" (
  id SERIAL UNIQUE PRIMARY KEY,
  nickname varchar(254) NOT NULL,
  email varchar(100) NOT NULL,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL
);

-----------------------------------------------
