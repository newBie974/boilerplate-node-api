-- Truncate table

TRUNCATE 
customer
RESTART IDENTITY;

-- Customer -----------------------------------

INSERT INTO customer(id, firstname, lastname, nickname, email)
VALUES (1, 'John', 'Doe', 'Nickname', 'john@doe.com');

-----------------------------------------------
