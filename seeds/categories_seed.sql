BEGIN;

INSERT INTO categories VALUES(1,'Vegetables');
INSERT INTO categories VALUES(2,'Fruits');
INSERT INTO categories VALUES(3,'Feculent');
INSERT INTO categories VALUES(4,'Condiments');
INSERT INTO categories VALUES(5,'Liquids');
INSERT INTO categories VALUES(6,'Spices');
INSERT INTO categories VALUES(7,'Meat');
INSERT INTO categories VALUES(8,'Seafood');
INSERT INTO categories VALUES(9,'Dairy products');
INSERT INTO categories VALUES(10,'Dessert');
INSERT INTO categories VALUES(11,'Eggs & Legumes');

SELECT setval('categories_id_seq',(SELECT MAX(id) FROM categories), true);

COMMIT;