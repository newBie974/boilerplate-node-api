-- Truncate table

TRUNCATE 
customer
RESTART IDENTITY;

-- Customer -----------------------------------

INSERT INTO customer(firstname, lastname, nickname, email)
VALUES ('John', 'Doe', 'Nickname', 'john@doe.com');

-----------------------------------------------
