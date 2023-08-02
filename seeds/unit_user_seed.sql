-- SQLite
BEGIN;

INSERT INTO unit_measures VALUES(1,'kilograms','kg',1000,'grams');
INSERT INTO unit_measures VALUES(2,'grams','g',1,'grams');
INSERT INTO unit_measures VALUES(3,'liters','L',1000,'mililiters');
INSERT INTO unit_measures VALUES(4,'centiliters','cl',10,'mililiters');
INSERT INTO unit_measures VALUES(5,'mililiters','ml',1,'mililiters');
INSERT INTO unit_measures VALUES(6,'tablespoon','tbsp',14,'grams');
INSERT INTO unit_measures VALUES(7,'teaspoon','tsp',5,'grams');
INSERT INTO unit_measures VALUES(8,'pods','pods',7,'grams');
INSERT INTO unit_measures VALUES(9,'pinch','pch',0.5,'grams');
INSERT INTO unit_measures VALUES(10,'pieces','pcs',NULL,'grams');
INSERT INTO unit_measures VALUES(11,'cup','cup',240,'mililiters');



INSERT INTO users VALUES('a48578b1-f134-40c1-90c4-919ae3e311bc','marie@gmail.com','$2a$10$970J93gFOPP2WEoSibSpnel1/tPrlW2DFzCt8WZj7JtXysuiZcaE.', false,'10/06/2023','10/06/2023');


INSERT INTO profiles VALUES(2,'a48578b1-f134-40c1-90c4-919ae3e311bc','Marie K.',NULL,NULL,NULL,NULL,NULL,NULL);



COMMIT;
