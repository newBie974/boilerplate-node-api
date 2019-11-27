-- Create table

-- Customer -----------------------------------
DROP TABLE IF EXISTS customer;

CREATE TABLE "customer" (
  id SERIAL UNIQUE PRIMARY KEY,
  nickname varchar(254) NOT NULL,
  email varchar(100) NOT NULL,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL
);

-----------------------------------------------
-- Auth  -----------------------------------
DROP TABLE IF EXISTS credentials;

CREATE TABLE "credentials" (
  customer_id bigint PRIMARY KEY,
  password varchar(254) NOT NULL,
  created_at varchar(100) NOT NULL,
  updated_at varchar(100) NOT NULL
);

-----------------------------------------------
