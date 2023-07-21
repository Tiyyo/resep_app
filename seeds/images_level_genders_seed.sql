BEGIN;

INSERT INTO difficulties VALUES(1,'easy');
INSERT INTO difficulties VALUES(2,'medium');
INSERT INTO difficulties VALUES(3,'hard');

SELECT setval('difficulties_id_seq',(SELECT MAX(id) FROM difficulties), true);

INSERT INTO genders VALUES(1,'Male');
INSERT INTO genders VALUES(2,'Female');

SELECT setval('genders_id_seq',(SELECT MAX(id) FROM genders), true);

INSERT INTO images VALUES(5,'clj7reg57000298vzgpji6zbf.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/clj7reg57000298vzgpji6zbf.jpg',400);
INSERT INTO images VALUES(6,'clj9bjl3i000gkwvz7hixgrgr.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/clj9bjl3i000gkwvz7hixgrgr.jpg',400);
INSERT INTO images VALUES(7,'cljk15sol000u18vz6sn124b0.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/cljk15sol000u18vz6sn124b0.jpg',400);
INSERT INTO images VALUES(8,'poulet-basque.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/poulet-basque.jpg',400);
INSERT INTO images VALUES(9,'cljk30pvv000v18vz1tvp04ut.jpeg','https://groc-app.s3.eu-west-3.amazonaws.com/cljk30pvv000v18vz1tvp04ut.jpeg',400);
INSERT INTO images VALUES(10,'cljk59yso000w18vz5rk00wku.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/cljk59yso000w18vz5rk00wku.jpg',400);
INSERT INTO images VALUES(11,'cljk6asf9000x18vzhy9176zr.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/cljk6asf9000x18vzhy9176zr.jpg',400);
INSERT INTO images VALUES(12,'cljk7zww6000z18vz68k97qjz.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/cljk7zww6000z18vz68k97qjz.jpg',400);
INSERT INTO images VALUES(13,'cljkcn3im001018vz2y1u1i3z.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/cljkcn3im001018vz2y1u1i3z.jpg',400);
INSERT INTO images VALUES(14,'cljkcoffa001118vz4ab2gi43.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/cljkcoffa001118vz4ab2gi43.jpg',400);
INSERT INTO images VALUES(15,'cljkdg3eu001218vz3dptcfc1.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/cljkdg3eu001218vz3dptcfc1.jpg',400);
INSERT INTO images VALUES(16,'cljkez3wc001318vzh28dbzv5.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/cljkez3wc001318vzh28dbzv5.jpg',400);
INSERT INTO images VALUES(17,'cljkft6vt001418vzhh8f9e6r.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/cljkft6vt001418vzhh8f9e6r.jpg',400);
INSERT INTO images VALUES(18,'cljkgtpuu001518vz1rb7dewd.jpg','https://groc-app.s3.eu-west-3.amazonaws.com/cljkgtpuu001518vz1rb7dewd.jpg',400);

SELECT setval('images_id_seq',(SELECT MAX(id) FROM images), true);

COMMIT;