PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('4d435d0c-dab9-4a08-9de6-0984a2e7f70e','b259dae9e98241218767acafae4f578757ec55067bc988e19633f7e646a6546b',1690048288684,'20220713162558_init',NULL,NULL,1690048288652,1);
INSERT INTO _prisma_migrations VALUES('fa22d569-475a-4804-aa45-8d1f20809715','b258889f597a8e4478b679749b533075c982b38f6ff6dea2b82170a958ecb78b',1690048851708,'20230722180051_01_init_db',NULL,NULL,1690048851494,1);
CREATE TABLE IF NOT EXISTS "genders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gender" TEXT NOT NULL
);

INSERT INTO genders VALUES(1,'Male');
INSERT INTO genders VALUES(2,'Female');

CREATE TABLE IF NOT EXISTS "images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageKey" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "width" INTEGER NOT NULL
);
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
CREATE TABLE IF NOT EXISTS "instructions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL
);
INSERT INTO instructions VALUES(1,'Serve with rice, you can add coriander');
INSERT INTO instructions VALUES(2,'Once chicken is fried , lower the heat and pour coconut milk , add another tablespoon of curry powder, adjust seasoning and simmer 10 min on low heat');
INSERT INTO instructions VALUES(3,'Add the chicken , 1 tablespoon of curry powder and season with salt and black pepper');
INSERT INTO instructions VALUES(4,'Heat some sesame oil or other oil and onions, saute for 2 or 3 min then add peppers and garlic, stir for 5 or 7 min');
INSERT INTO instructions VALUES(5,'Prepare all ingredients, cut peppers into medium strips, mince the garlic, chop onions into strip, cut chicken into medium pieces');
INSERT INTO instructions VALUES(10,'Serve with rice, you can add coriander');
INSERT INTO instructions VALUES(11,'Once chicken is fried , lower the heat and pour coconut milk , add another tablespoon of curry powder, adjust seasoning and simmer 10 min on low heat');
INSERT INTO instructions VALUES(12,'Add the chicken , 1 tablespoon of curry powder and season with salt and black pepper');
INSERT INTO instructions VALUES(13,'Heat some sesame oil or other oil and onions, saute for 2 or 3 min then add peppers and garlic, stir for 5 or 7 min');
INSERT INTO instructions VALUES(14,'Prepare all ingredients, cut peppers into medium strips, mince the garlic, chop onions into strip, cut chicken into medium pieces');
INSERT INTO instructions VALUES(15,'Serve with rice, you can add coriander');
INSERT INTO instructions VALUES(16,'Once chicken is fried , lower the heat and pour coconut milk , add another tablespoon of curry powder, adjust seasoning and simmer 10 min on low heat');
INSERT INTO instructions VALUES(17,'Add the chicken , 1 tablespoon of curry powder and season with salt and black pepper');
INSERT INTO instructions VALUES(18,'Heat some sesame oil or other oil and onions, saute for 2 or 3 min then add peppers and garlic, stir for 5 or 7 min');
INSERT INTO instructions VALUES(19,'Prepare all ingredients, cut peppers into medium strips, mince the garlic, chop onions into strip, cut chicken into medium pieces');
INSERT INTO instructions VALUES(20,'Serve with rice, you can add coriander');
INSERT INTO instructions VALUES(21,'Once chicken is fried , lower the heat and pour coconut milk , add another tablespoon of curry powder, adjust seasoning and simmer 10 min on low heat');
INSERT INTO instructions VALUES(22,'Add the chicken , 1 tablespoon of curry powder and season with salt and black pepper');
INSERT INTO instructions VALUES(23,'Heat some sesame oil or other oil and onions, saute for 2 or 3 min then add peppers and garlic, stir for 5 or 7 min');
INSERT INTO instructions VALUES(24,'Prepare all ingredients, cut peppers into medium strips, mince the garlic, chop onions into strip, cut chicken into medium pieces');
INSERT INTO instructions VALUES(47,'Serve with rice, you can add coriander');
INSERT INTO instructions VALUES(48,'Once chicken is fried , lower the heat and pour coconut milk , add another tablespoon of curry powder, adjust seasoning and simmer 10 min on low heat');
INSERT INTO instructions VALUES(49,'Add the chicken , 1 tablespoon of curry powder and season with salt and black pepper');
INSERT INTO instructions VALUES(50,'Heat some sesame oil or other oil and onions, saute for 2 or 3 min then add peppers and garlic, stir for 5 or 7 min');
INSERT INTO instructions VALUES(51,'Prepare all ingredients, cut peppers into medium strips, mince the garlic, chop onions into strip, cut chicken into medium pieces');
INSERT INTO instructions VALUES(60,'Serve with rice, you can add coriander ');
INSERT INTO instructions VALUES(61,'Once chicken is fried , lower the heat and pour coconut milk , add another tablespoon of curry powder, adjust seasoning and simmer 10 min on low heat');
INSERT INTO instructions VALUES(62,'Add the chicken , 1 tablespoon of curry powder and season with salt and black pepper');
INSERT INTO instructions VALUES(63,'Heat some sesame oil or other oil and onions, saute for 2 or 3 min then add peppers and garlic, stir for 5 or 7 min');
INSERT INTO instructions VALUES(64,'Prepare all ingredients, cut peppers into medium strips, mince the garlic, chop onions into strip, cut chicken into medium pieces');
INSERT INTO instructions VALUES(65,'Pour the dressing over the salad, making sure to coat it evenly. Serve immediately!');
INSERT INTO instructions VALUES(66,'Add the quartered hard-boiled eggs');
INSERT INTO instructions VALUES(67,'Add the sliced cooked chicken to the salad');
INSERT INTO instructions VALUES(68,'Add the sliced tomatoes, croutons, and grated Parmesan cheese to the lettuce.');
INSERT INTO instructions VALUES(69,'In a large salad bowl, place the torn lettuce leaves');
INSERT INTO instructions VALUES(70,'Start by preparing the dressing. In a small bowl, whisk together soya sauce, red wine vinegar, mustard, greek yogurt, honey .Slowly add the olive oil while whisking constantly to emulsify the dressing. Season with black peper and cumin to taste. Set aside.');
INSERT INTO instructions VALUES(71,'Cook the chicken breast over high heat');
INSERT INTO instructions VALUES(72,'Start by boiling 9 to 11min the eggs until they are hard-boiled ');
INSERT INTO instructions VALUES(73,'Pour the pasta into the pan with the pork bellys (with the heat turned off), then quickly add the egg and Parmesan mixture, stirring well. Be careful not to let the eggs cook too quickly, or you might end up with scrambled eggs! Gradually add a little pasta cooking water until you achieve a creamy sauce consistency. It''s ready! Serve immediately with some Parmesan cheese shavings on top.');
INSERT INTO instructions VALUES(74,'Towards the end of the pasta cooking time, gently reheat the pork bellys over low heat. Drain the pasta, reserving a small amount of the cooking water in a separate bowl.');
INSERT INTO instructions VALUES(75,'In a bowl, mix the egg, egg yolks, and grated Parmesan cheese. Season generously with freshly ground pepper.');
INSERT INTO instructions VALUES(76,'After 2-3 minutes over high heat, remove most of the fat from the pan, leaving about one tablespoon. Set aside.');
INSERT INTO instructions VALUES(77,'Meanwhile, cut the porrk bellys into thick 1cm-sided lardons. Grill the pancetta in a pan without adding any fat.');
INSERT INTO instructions VALUES(78,'Add the pasta to the boiling water and cooked them aldente');
INSERT INTO instructions VALUES(79,'Bring a large pot of water to a boil. No need to add salt, as the pork and parmesan cheese should be salty enough.');
INSERT INTO instructions VALUES(80,'Taste and adjust the seasoning with salt and pepper if needed. Serve the chicken Basquaise hot with rice, garnished with fresh chopped parsley.');
INSERT INTO instructions VALUES(81,'Reduce the heat to low, cover the skillet, and simmer for about 30-40 minutes, or until the chicken is cooked through and tender.');
INSERT INTO instructions VALUES(82,'Return the chicken pieces to the skillet, nestling them into the vegetable mixture.');
INSERT INTO instructions VALUES(83,'Pour in the chicken broth and white wine, and stir to combine.');
INSERT INTO instructions VALUES(84,'Stir in thepeeled, seeded and chopped tomatoes, espelette pepper and dried oregano. Cook for a few minutes to allow the flavors to meld together.');
INSERT INTO instructions VALUES(85,'Add the sliced peppers to the skillet and cook until they start to soften.');
INSERT INTO instructions VALUES(86,'In the same skillet, add the sliced onion and minced garlic. Sauté until the onion becomes translucent.');
INSERT INTO instructions VALUES(87,'In a large skillet or Dutch oven, heat the olive oil over medium-high heat.');
INSERT INTO instructions VALUES(88,'Season the chicken pieces with salt and pepper.');
INSERT INTO instructions VALUES(89,'Serve the couscous accompanied by semolina, meat, merguez sausages, vegetables, and broth.');
INSERT INTO instructions VALUES(90,'Grill the merguez sausages in a dry skillet.');
INSERT INTO instructions VALUES(91,'Cook semolina by soaking it in one and a half times its volume of water. Fluff it with the butter cut into small pieces.');
INSERT INTO instructions VALUES(92,'Cover with enough water to submerge the ingredients and bring to a simmer. Let it simmer for 1 hour covered.');
INSERT INTO instructions VALUES(93,'Add the peeled and chopped carrots, the peeled and quartered turnips, and the drained chickpeas. Add the tomato paste, ras el hanout, harissa, and a pinch of salt. Return the onions and crushed garlic to the pan.');
INSERT INTO instructions VALUES(94,'In a sauté pan, heat the olive oil. Sauté the onions until golden brown, remove them and place the lamb and chicken in the pan. Sauté for a few minutes.');
INSERT INTO instructions VALUES(95,'Cut the lamb neck into large cubes.');
INSERT INTO instructions VALUES(96,'Serve over buttered white rice and garnish with fresh green onions and sesame seeds.');
INSERT INTO instructions VALUES(97,'Return the chicken to the pan and mix well.');
INSERT INTO instructions VALUES(98,'Bring to a boil while stirring constantly until the sauce thickens.');
INSERT INTO instructions VALUES(99,'Pour the marinade into the pan, add the butter, and return to medium heat.');
INSERT INTO instructions VALUES(100,'Remove the pan from the heat (to prevent the bottom from burning and giving a bitter taste) and transfer the chicken in Teriyaki sauce to a bowl.');
INSERT INTO instructions VALUES(101,'Cook the chicken in the pan until the pieces turn a beautiful golden color, stirring occasionally.');
INSERT INTO instructions VALUES(102,'Remove the chicken pieces from the marinade using a slotted spoon.');
INSERT INTO instructions VALUES(103,'Heat a large non-stick pan and add 1 tablespoon of olive oil.');
INSERT INTO instructions VALUES(104,'In a bowl, mix together the soya sauce, honey, orange juice, ginger, and sesame oil.');
INSERT INTO instructions VALUES(105,'Cut the chicken escalopes into small cubes after rinsing them.');
INSERT INTO instructions VALUES(106,'Transfer the Cantonese rice to a shallow dish. Arrange the chicken strips on top and drizzle with their cooking juices. Sprinkle with chopped parsley and serve immediately.');
INSERT INTO instructions VALUES(107,'Fluff the rice with a fork. Heat the peanut oil in a sauté pan or wok. Add the rice and spring onions. Sauté them over high heat for 5 minutes, stirring. Then add the pieces of ham, peas, and diced omelette. Mix well and continue cooking for 3 minutes.');
INSERT INTO instructions VALUES(108,'Heat a non-stick frying pan and cook the omelette in it. Remove it from the pan and cut it into small cubes.');
INSERT INTO instructions VALUES(109,'Meanwhile, cut the slices of ham into small cubes. Slice the spring onions. Beat the eggs with the remaining sesame oil and a pinch of salt.');
INSERT INTO instructions VALUES(110,'Heat 3 tablespoons of sesame oil in a pan and brown the chicken strips in it. When they are well browned, season with salt and pepper and pour in the lemon juice. Bring to a boil, then let it simmer for 20 minutes over low heat.');
INSERT INTO instructions VALUES(111,'On the same day, cut the chicken breasts into strips. Squeeze the lemons. Wash, dry, and finely chop the parsley.');
INSERT INTO instructions VALUES(112,'The day before, cook the rice in boiling salted water for the time indicated on the package. Drain it and, after cooling, refrigerate it covered with plastic wrap.');
INSERT INTO instructions VALUES(113,'Serve with rice');
INSERT INTO instructions VALUES(114,'Dissolve the beef bouillon powder in 240ml of hot water, then add it to the pot. Reduce the heat to low and let the chili simmer for about 30-40 minutes, allowing the flavors to meld together.');
INSERT INTO instructions VALUES(115,'Pour in the tomato puree and stir to incorporate it into the mixture. Season with salt and pepper according to your taste.');
INSERT INTO instructions VALUES(116,'Pour in the tomato puree and stir to incorporate it into the mixture.');
INSERT INTO instructions VALUES(117,'Sprinkle the chili powder, cumin, and garlic powder over the meat and vegetable mixture. Stir to evenly coat everything with the spices.');
INSERT INTO instructions VALUES(118,'Once the beef is cooked, add the diced bell peppers and corn kernels to the pot. Stir well to combine.');
INSERT INTO instructions VALUES(119,'Add the ground beef to the pot and cook until browned, breaking it up into crumbles with a spatula');
INSERT INTO instructions VALUES(120,'Heat a drizzle of olive oil in a large pot or Dutch oven over medium heat. Add the chopped red onion and minced garlic to the pot. Sauté until the onion becomes translucent and fragrant.');
INSERT INTO instructions VALUES(121,'Prepare the dressing by mixing olive oil, balsamic vinegar, greek yogurt and mustard in a bowl. Add salt and pepper to taste.');
INSERT INTO instructions VALUES(122,'Add sliced mozarella to the bowl');
INSERT INTO instructions VALUES(123,'Cook the chicken in a pan for approximately 10 minutes. Once the chicken breasts are cooked, let them cool, then slice them and add them to the salad bowl.');
INSERT INTO instructions VALUES(124,'Cook your eggs in a pot of boiling water for 9 minutes until hard-boiled, then let them cool , slice them in quarter and add them to the bowl');
INSERT INTO instructions VALUES(125,'Peel and grate your cucumber, then add it to the salad bowl.');
INSERT INTO instructions VALUES(126,'Wash and halve your cherry tomatoes, then add them sliced in two to the salad bowl ');
INSERT INTO instructions VALUES(127,'Wash and dry your salad greens, then place them in a salad bowl (you can use any type of green lettuce, romaine, arugula, etc.).');
INSERT INTO instructions VALUES(128,'Now add the marinated chicken and marinade to the wok and stir-fry for 5 minutes, mixing well until the chicken is cooked. You can either toast the cashews separately in a pan or add them directly to the wok. Remove from heat as soon as they are nicely browned,  and serve immediately with rice');
INSERT INTO instructions VALUES(129,'In a wok or large frying pan, heat the peanut oil or sesame oil and stir-fry the espelette pepper, black pepper with minced garlic, ginger, onion, and red pepper.');
INSERT INTO instructions VALUES(130,'Add the chicken to the marinade, mix well, and let it marinate in the refrigerator for at least 30 minutes.');
INSERT INTO instructions VALUES(131,'Prepare the marinade by mixing soy sauce, rice vinegar, granulated sugar, and cornstarch in a bowl. If the marinade is too thick, add a little soy sauce.');
INSERT INTO instructions VALUES(132,'Cook your pasta the serve hot');
INSERT INTO instructions VALUES(133,'Add roughly chopped tomatoes, tomatoes puree, mixed herbs and vegetables , reduce heat and simmer covered for 1 to 1h30 hours, allowing the wine to evaporate.');
INSERT INTO instructions VALUES(134,'Add the broth, red wine and tomatoes concentrate, let reduce');
INSERT INTO instructions VALUES(135,'In a other pan, add the ground beef. Brown it and stir to prevent the meat from forming large clumps.');
INSERT INTO instructions VALUES(136,'Heat the oil in a large enough saucepan. Sauté the garlic, chopped onion and cutted carrot over low heat for 5 minutes, stirring.');
INSERT INTO instructions VALUES(137,'Reduce the heat , then add fresh cream, mustard, oregano and some cooking water from pasta, then add pasta and serve !');
INSERT INTO instructions VALUES(138,'In another non-stick pan, brown the diced chicken breasts .Then add them to the mushroom mixture along with salt and pepper, and let it cook for 6 to 8 minutes.');
INSERT INTO instructions VALUES(139,'Pour the chicken broth and white wine over the mixture and let it cook for another 10 minutes. Meanwhile cook the pasta, keep cooking water.');
INSERT INTO instructions VALUES(140,'Then add the mushrooms and continue cooking for another 2 minutes, stirring.');
INSERT INTO instructions VALUES(141,'sauté the chopped shallots, minced garlic in a pan with olive oil for 3 minutes, stirring without browning them.');
INSERT INTO instructions VALUES(142,'Add chicken and his marinade to the vegetables. Reduce the heat for few minutes. Serve with rice!');
INSERT INTO instructions VALUES(143,'Add yellow pepper and zucchini to eggplants. In another pan, cook the marinade until the chicken is golden.');
INSERT INTO instructions VALUES(144,'In a heat pan , add sliced eggplants and cook them for few minutes.');
INSERT INTO instructions VALUES(145,'In a bowl add chopped chicken , soy sauce, espelette pepper , salt, black pepper and any spices you like. Stir');
CREATE TABLE IF NOT EXISTS "difficulties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO difficulties VALUES(1,'easy');
INSERT INTO difficulties VALUES(2,'medium');
INSERT INTO difficulties VALUES(3,'hard');
CREATE TABLE IF NOT EXISTS "icons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image_key" TEXT NOT NULL
);
INSERT INTO icons VALUES(1,'rice','https://groc-app.s3.eu-west-3.amazonaws.com/clj4dgy6c0000dwvz2mdof68u.png','clj4dgy6c0000dwvz2mdof68u.png');
INSERT INTO icons VALUES(3,'Yellow pepper','https://groc-app.s3.eu-west-3.amazonaws.com/clj4dl6mr0002dwvz8qeyb1k5.png','clj4dl6mr0002dwvz8qeyb1k5.png');
INSERT INTO icons VALUES(4,'Red pepper','https://groc-app.s3.eu-west-3.amazonaws.com/clj4dm2750003dwvzevd91kfx.png','clj4dm2750003dwvzevd91kfx.png');
INSERT INTO icons VALUES(5,'Garlic','https://groc-app.s3.eu-west-3.amazonaws.com/clj4dmsa90004dwvz6ay01vfb.png','clj4dmsa90004dwvz6ay01vfb.png');
INSERT INTO icons VALUES(6,'Curry','https://groc-app.s3.eu-west-3.amazonaws.com/clj4dn9r40005dwvz2xhsbufm.png','clj4dn9r40005dwvz2xhsbufm.png');
INSERT INTO icons VALUES(7,'Salt','https://groc-app.s3.eu-west-3.amazonaws.com/clj4dnniw0006dwvz0trc62sr.png','clj4dnniw0006dwvz0trc62sr.png');
INSERT INTO icons VALUES(8,'Black pepper','https://groc-app.s3.eu-west-3.amazonaws.com/clj4dv9kc0007dwvzghp3hzuz.png','clj4dv9kc0007dwvzghp3hzuz.png');
INSERT INTO icons VALUES(9,'Chicken breast','https://groc-app.s3.eu-west-3.amazonaws.com/clj4dvrvu0008dwvzgrta1ldp.png','clj4dvrvu0008dwvzgrta1ldp.png');
INSERT INTO icons VALUES(10,'Coconut Milk','https://groc-app.s3.eu-west-3.amazonaws.com/clj4dw6x80009dwvz4tmrbgqd.png','clj4dw6x80009dwvz4tmrbgqd.png');
INSERT INTO icons VALUES(11,'Red onion','https://groc-app.s3.eu-west-3.amazonaws.com/clj4dwox5000adwvzdf2b8q9z.png','clj4dwox5000adwvzdf2b8q9z.png');
INSERT INTO icons VALUES(14,'Eggs','https://groc-app.s3.eu-west-3.amazonaws.com/clj91ii1q0000vsvzc8pcfc78.jpg','clj91ii1q0000vsvzc8pcfc78.jpg');
INSERT INTO icons VALUES(15,'Salad','https://groc-app.s3.eu-west-3.amazonaws.com/clj922qw50001vsvzbwc7cbfv.jpg','clj922qw50001vsvzbwc7cbfv.jpg');
INSERT INTO icons VALUES(16,'Tomatoes','https://groc-app.s3.eu-west-3.amazonaws.com/clj923onk0002vsvz2ui53vww.jpg','clj923onk0002vsvz2ui53vww.jpg');
INSERT INTO icons VALUES(17,'Parmesan','https://groc-app.s3.eu-west-3.amazonaws.com/clj924eaz0003vsvz25kp2ci8.jpg','clj924eaz0003vsvz25kp2ci8.jpg');
INSERT INTO icons VALUES(18,'Oil','https://groc-app.s3.eu-west-3.amazonaws.com/clj926kik0004vsvzcz4sh4zf.jpg','clj926kik0004vsvzcz4sh4zf.jpg');
INSERT INTO icons VALUES(19,'Mustard','https://groc-app.s3.eu-west-3.amazonaws.com/clj927lof0005vsvz29rm77vf.jpg','clj927lof0005vsvz29rm77vf.jpg');
INSERT INTO icons VALUES(20,'Greek yogurt','https://groc-app.s3.eu-west-3.amazonaws.com/clj928dfd0006vsvz7ihucl4s.jpg','clj928dfd0006vsvz7ihucl4s.jpg');
INSERT INTO icons VALUES(21,'Red wine vinegar','https://groc-app.s3.eu-west-3.amazonaws.com/clj928zyr0007vsvzdjz17kvp.jpg','clj928zyr0007vsvzdjz17kvp.jpg');
INSERT INTO icons VALUES(22,'soy sauce','https://groc-app.s3.eu-west-3.amazonaws.com/clj929fca0008vsvz0bgn9zwo.jpg','clj929fca0008vsvz0bgn9zwo.jpg');
INSERT INTO icons VALUES(23,'Honey','https://groc-app.s3.eu-west-3.amazonaws.com/clj929wyh0009vsvzggw71rz8.jpg','clj929wyh0009vsvzggw71rz8.jpg');
INSERT INTO icons VALUES(24,'Bread croutons','https://groc-app.s3.eu-west-3.amazonaws.com/clj97dtxv0000kwvz59b43hv6.jpg','clj97dtxv0000kwvz59b43hv6.jpg');
INSERT INTO icons VALUES(25,'Cumin','https://groc-app.s3.eu-west-3.amazonaws.com/clj97mh8c0001kwvzcvu2guv6.jpg','clj97mh8c0001kwvzcvu2guv6.jpg');
INSERT INTO icons VALUES(28,'carotts','https://groc-app.s3.eu-west-3.amazonaws.com/cljie8pnx00007wvz9ap9e24o.jpg','cljie8pnx00007wvz9ap9e24o.jpg');
INSERT INTO icons VALUES(29,'tomato puree','https://groc-app.s3.eu-west-3.amazonaws.com/cljiebc7r00017wvz44saeucq.jpg','cljiebc7r00017wvz44saeucq.jpg');
INSERT INTO icons VALUES(30,'pasta','https://groc-app.s3.eu-west-3.amazonaws.com/cljieey3g00027wvzcm3ig9l2.jpg','cljieey3g00027wvzcm3ig9l2.jpg');
INSERT INTO icons VALUES(31,'zucchini','https://groc-app.s3.eu-west-3.amazonaws.com/cljiegl5000037wvz23nue9da.jpg','cljiegl5000037wvz23nue9da.jpg');
INSERT INTO icons VALUES(32,'Eggplants','https://groc-app.s3.eu-west-3.amazonaws.com/cljiem7zo00047wvzb3gd4hvn.jpg','cljiem7zo00047wvzb3gd4hvn.jpg');
INSERT INTO icons VALUES(33,'sesame seed','https://groc-app.s3.eu-west-3.amazonaws.com/cljies9hb00057wvz45uy76hx.jpg','cljies9hb00057wvz45uy76hx.jpg');
INSERT INTO icons VALUES(34,'Beef','https://groc-app.s3.eu-west-3.amazonaws.com/cljieu4t900067wvz0ojshatq.jpg','cljieu4t900067wvz0ojshatq.jpg');
INSERT INTO icons VALUES(35,'ginger','https://groc-app.s3.eu-west-3.amazonaws.com/cljiext9900077wvz7dkb4eeg.jpg','cljiext9900077wvz7dkb4eeg.jpg');
INSERT INTO icons VALUES(36,'White wine','https://groc-app.s3.eu-west-3.amazonaws.com/cljiqk0su00087wvzc0hhheyk.jpg','cljiqk0su00087wvzc0hhheyk.jpg');
INSERT INTO icons VALUES(37,'Mozarella','https://groc-app.s3.eu-west-3.amazonaws.com/cljixplyg00097wvz6r564crb.jpg','cljixplyg00097wvz6r564crb.jpg');
INSERT INTO icons VALUES(38,'cucumber','https://groc-app.s3.eu-west-3.amazonaws.com/cljixun3b000a7wvz60en1f96.jpg','cljixun3b000a7wvz60en1f96.jpg');
INSERT INTO icons VALUES(39,'Basilic','https://groc-app.s3.eu-west-3.amazonaws.com/cljixx06i000b7wvzbx1pdk55.jpg','cljixx06i000b7wvzbx1pdk55.jpg');
INSERT INTO icons VALUES(40,'Mushroom','https://groc-app.s3.eu-west-3.amazonaws.com/cljiy28c4000c7wvzdce0gq9z.jpg','cljiy28c4000c7wvzdce0gq9z.jpg');
INSERT INTO icons VALUES(41,'oregano','https://groc-app.s3.eu-west-3.amazonaws.com/cljjpmgm8000018vz3f923882.jpg','cljjpmgm8000018vz3f923882.jpg');
INSERT INTO icons VALUES(42,'fresh cream','https://groc-app.s3.eu-west-3.amazonaws.com/cljjps5o1000118vz36tn86xp.jpg','cljjps5o1000118vz36tn86xp.jpg');
INSERT INTO icons VALUES(43,'yolk','https://groc-app.s3.eu-west-3.amazonaws.com/cljjqhfb0000218vz0mo9f6y2.jpg','cljjqhfb0000218vz0mo9f6y2.jpg');
INSERT INTO icons VALUES(44,'pork belly','https://groc-app.s3.eu-west-3.amazonaws.com/cljjqlpmg000318vz0te21cje.jpg','cljjqlpmg000318vz0te21cje.jpg');
INSERT INTO icons VALUES(45,'pepper espelette','https://groc-app.s3.eu-west-3.amazonaws.com/cljjqsg9v000418vz937w88d1.jpg','cljjqsg9v000418vz937w88d1.jpg');
INSERT INTO icons VALUES(46,'chicken leg','https://groc-app.s3.eu-west-3.amazonaws.com/cljjqv8gs000518vzfw4pcp5g.jpg','cljjqv8gs000518vzfw4pcp5g.jpg');
INSERT INTO icons VALUES(47,'mixed herbs','https://groc-app.s3.eu-west-3.amazonaws.com/cljjr2qns000618vz81z6h7qd.jpg','cljjr2qns000618vz81z6h7qd.jpg');
INSERT INTO icons VALUES(48,'orange juice','https://groc-app.s3.eu-west-3.amazonaws.com/cljjr4t1j000718vz9h9aavu2.jpg','cljjr4t1j000718vz9h9aavu2.jpg');
INSERT INTO icons VALUES(49,'butter','https://groc-app.s3.eu-west-3.amazonaws.com/cljjrcb8z000818vz1n0t9kv4.jpg','cljjrcb8z000818vz1n0t9kv4.jpg');
INSERT INTO icons VALUES(50,'green onion','https://groc-app.s3.eu-west-3.amazonaws.com/cljjrq8yx000918vz1eqheu4l.jpg','cljjrq8yx000918vz1eqheu4l.jpg');
INSERT INTO icons VALUES(51,'duck breast','https://groc-app.s3.eu-west-3.amazonaws.com/cljjs9clh000a18vz4h386hg7.webp','cljjs9clh000a18vz4h386hg7.webp');
INSERT INTO icons VALUES(52,'lamb','https://groc-app.s3.eu-west-3.amazonaws.com/cljjtnvcn000b18vzfba1h2yy.jpg','cljjtnvcn000b18vzfba1h2yy.jpg');
INSERT INTO icons VALUES(53,'semolina','https://groc-app.s3.eu-west-3.amazonaws.com/cljjwsnsh000c18vzhrw0b6h3.jpg','cljjwsnsh000c18vzhrw0b6h3.jpg');
INSERT INTO icons VALUES(54,'merguez','https://groc-app.s3.eu-west-3.amazonaws.com/cljjwy7to000d18vzbj4e7lav.jpg','cljjwy7to000d18vzbj4e7lav.jpg');
INSERT INTO icons VALUES(55,'chickpea','https://groc-app.s3.eu-west-3.amazonaws.com/cljjx2011000e18vz0h1ibnfr.jpg','cljjx2011000e18vz0h1ibnfr.jpg');
INSERT INTO icons VALUES(56,'turnip','https://groc-app.s3.eu-west-3.amazonaws.com/cljjxbzbb000f18vz789c4b68.webp','cljjxbzbb000f18vz789c4b68.webp');
INSERT INTO icons VALUES(57,'red wine','https://groc-app.s3.eu-west-3.amazonaws.com/cljjyneu2000g18vz6eml6qjq.jpg','cljjyneu2000g18vz6eml6qjq.jpg');
INSERT INTO icons VALUES(58,'cornstarch','https://groc-app.s3.eu-west-3.amazonaws.com/cljjyosbe000h18vz82l06rex.jpeg','cljjyosbe000h18vz82l06rex.jpeg');
INSERT INTO icons VALUES(59,'rice vinegar','https://groc-app.s3.eu-west-3.amazonaws.com/cljjyp8kp000i18vz4lxj1qpn.jpg','cljjyp8kp000i18vz4lxj1qpn.jpg');
INSERT INTO icons VALUES(60,'cashew','https://groc-app.s3.eu-west-3.amazonaws.com/cljjypvdj000j18vz0i9ph0ic.jpg','cljjypvdj000j18vz0i9ph0ic.jpg');
INSERT INTO icons VALUES(61,'chicken broth','https://groc-app.s3.eu-west-3.amazonaws.com/cljjyqwue000k18vzg811chds.webp','cljjyqwue000k18vzg811chds.webp');
INSERT INTO icons VALUES(62,'Beef broth','https://groc-app.s3.eu-west-3.amazonaws.com/cljjyrimg000l18vzd10h890r.webp','cljjyrimg000l18vzd10h890r.webp');
INSERT INTO icons VALUES(63,'red beans','https://groc-app.s3.eu-west-3.amazonaws.com/cljjyrt95000m18vzg9rl1evx.jpg','cljjyrt95000m18vzg9rl1evx.jpg');
INSERT INTO icons VALUES(64,'chili ','https://groc-app.s3.eu-west-3.amazonaws.com/cljjyscpp000n18vz6jv23fl5.jpg','cljjyscpp000n18vz6jv23fl5.jpg');
INSERT INTO icons VALUES(65,'parsley','https://groc-app.s3.eu-west-3.amazonaws.com/cljjytu7h000o18vzb80ce6jn.jpg','cljjytu7h000o18vzb80ce6jn.jpg');
INSERT INTO icons VALUES(66,'peas','https://groc-app.s3.eu-west-3.amazonaws.com/cljjyucee000p18vzhjnob04w.jpg','cljjyucee000p18vzhjnob04w.jpg');
INSERT INTO icons VALUES(67,'lemon','https://groc-app.s3.eu-west-3.amazonaws.com/cljjyusi7000q18vz0vch8lcl.jpg','cljjyusi7000q18vz0vch8lcl.jpg');
INSERT INTO icons VALUES(68,'Cooked ham','https://groc-app.s3.eu-west-3.amazonaws.com/cljjyvep3000r18vzgil75a9z.jpg','cljjyvep3000r18vzgil75a9z.jpg');
INSERT INTO icons VALUES(69,'brown sugar','https://groc-app.s3.eu-west-3.amazonaws.com/cljjz51hc000s18vzadj6arwn.jpg','cljjz51hc000s18vzadj6arwn.jpg');
INSERT INTO icons VALUES(70,'shallot','https://groc-app.s3.eu-west-3.amazonaws.com/cljjzcvh9000t18vz0w0p2g8p.webp','cljjzcvh9000t18vz0w0p2g8p.webp');
INSERT INTO icons VALUES(71,'corn','https://groc-app.s3.eu-west-3.amazonaws.com/cljk7l6ya000y18vzcj4uavmw.jpg','cljk7l6ya000y18vzcj4uavmw.jpg');
CREATE TABLE IF NOT EXISTS "tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO tags VALUES(1,'rice');
INSERT INTO tags VALUES(2,'basmati');
INSERT INTO tags VALUES(3,'feculent');
INSERT INTO tags VALUES(4,'pepper');
INSERT INTO tags VALUES(5,'yellow');
INSERT INTO tags VALUES(6,'vegetabes');
INSERT INTO tags VALUES(7,'vegetables');
INSERT INTO tags VALUES(8,'red');
INSERT INTO tags VALUES(9,'garlic');
INSERT INTO tags VALUES(10,'curry');
INSERT INTO tags VALUES(11,'spices');
INSERT INTO tags VALUES(12,'condiment');
INSERT INTO tags VALUES(13,'salt');
INSERT INTO tags VALUES(14,'black');
INSERT INTO tags VALUES(15,'seasoning');
INSERT INTO tags VALUES(16,'chicken');
INSERT INTO tags VALUES(17,'meat');
INSERT INTO tags VALUES(18,'breast');
INSERT INTO tags VALUES(19,'coconut');
INSERT INTO tags VALUES(20,'liquids');
INSERT INTO tags VALUES(21,'milk');
INSERT INTO tags VALUES(22,'onion');
INSERT INTO tags VALUES(23,'asia');
INSERT INTO tags VALUES(24,'egg');
INSERT INTO tags VALUES(25,'proteins');
INSERT INTO tags VALUES(26,'salad');
INSERT INTO tags VALUES(27,'tomato');
INSERT INTO tags VALUES(28,'fruits');
INSERT INTO tags VALUES(29,'parmesan');
INSERT INTO tags VALUES(30,'products');
INSERT INTO tags VALUES(31,'dairy');
INSERT INTO tags VALUES(32,'cheese');
INSERT INTO tags VALUES(33,'oil');
INSERT INTO tags VALUES(34,'mustard');
INSERT INTO tags VALUES(35,'sauce');
INSERT INTO tags VALUES(36,'condiments');
INSERT INTO tags VALUES(37,'yogurt');
INSERT INTO tags VALUES(38,'greek');
INSERT INTO tags VALUES(39,'produtcs');
INSERT INTO tags VALUES(40,'vinegar');
INSERT INTO tags VALUES(41,'soya');
INSERT INTO tags VALUES(42,'honey');
INSERT INTO tags VALUES(43,'sugar');
INSERT INTO tags VALUES(44,'bread');
INSERT INTO tags VALUES(45,'croutons');
INSERT INTO tags VALUES(46,'oriental');
INSERT INTO tags VALUES(47,'cumin');
INSERT INTO tags VALUES(48,'essai');
INSERT INTO tags VALUES(49,'carrots');
INSERT INTO tags VALUES(50,'puree');
INSERT INTO tags VALUES(51,'pasta');
INSERT INTO tags VALUES(52,'zucchini');
INSERT INTO tags VALUES(53,'eggplants');
INSERT INTO tags VALUES(54,'sesame');
INSERT INTO tags VALUES(55,'seed');
INSERT INTO tags VALUES(56,'beef');
INSERT INTO tags VALUES(57,'ginger');
INSERT INTO tags VALUES(58,'wine');
INSERT INTO tags VALUES(59,'mozarella');
INSERT INTO tags VALUES(60,'cucumber');
INSERT INTO tags VALUES(61,'basilic');
INSERT INTO tags VALUES(62,'plants');
INSERT INTO tags VALUES(63,'mushroom');
INSERT INTO tags VALUES(64,'aromatic');
INSERT INTO tags VALUES(65,'oregano');
INSERT INTO tags VALUES(66,'herbs');
INSERT INTO tags VALUES(67,'cream');
INSERT INTO tags VALUES(68,'eggs');
INSERT INTO tags VALUES(69,'pork');
INSERT INTO tags VALUES(70,'french');
INSERT INTO tags VALUES(71,'espelette');
INSERT INTO tags VALUES(72,'laurel');
INSERT INTO tags VALUES(73,'thyme');
INSERT INTO tags VALUES(74,'juice');
INSERT INTO tags VALUES(75,'orange');
INSERT INTO tags VALUES(76,'butter');
INSERT INTO tags VALUES(77,'duck');
INSERT INTO tags VALUES(78,'lamb');
INSERT INTO tags VALUES(79,'raw');
INSERT INTO tags VALUES(80,'semolina');
INSERT INTO tags VALUES(81,'wheat');
INSERT INTO tags VALUES(82,'sausage');
INSERT INTO tags VALUES(83,'chickpea');
INSERT INTO tags VALUES(84,'legume');
INSERT INTO tags VALUES(85,'turnip');
INSERT INTO tags VALUES(86,'cornstarch');
INSERT INTO tags VALUES(87,'cashew');
INSERT INTO tags VALUES(88,'poultry');
INSERT INTO tags VALUES(89,'broth');
INSERT INTO tags VALUES(90,'beans');
INSERT INTO tags VALUES(91,'chili');
INSERT INTO tags VALUES(92,'powder');
INSERT INTO tags VALUES(93,'parsley');
INSERT INTO tags VALUES(94,'peas');
INSERT INTO tags VALUES(95,'lemon');
INSERT INTO tags VALUES(96,'ham');
INSERT INTO tags VALUES(97,'brown');
INSERT INTO tags VALUES(98,'suger');
INSERT INTO tags VALUES(99,'shallot');
INSERT INTO tags VALUES(100,'carbonara');
INSERT INTO tags VALUES(101,'italy');
INSERT INTO tags VALUES(102,'tomatoes');
INSERT INTO tags VALUES(103,'marocco');
INSERT INTO tags VALUES(104,'japan');
INSERT INTO tags VALUES(105,'china');
INSERT INTO tags VALUES(106,'corn');
INSERT INTO tags VALUES(107,'american');
CREATE TABLE IF NOT EXISTS "tags_on_icons" (
    "icon_id" INTEGER NOT NULL,
    "tag_name" TEXT NOT NULL,

    PRIMARY KEY ("icon_id", "tag_name"),
    CONSTRAINT "tags_on_icons_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "icons" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "tags_on_icons_tag_name_fkey" FOREIGN KEY ("tag_name") REFERENCES "tags" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO tags_on_icons VALUES(1,'rice');
INSERT INTO tags_on_icons VALUES(1,'basmati');
INSERT INTO tags_on_icons VALUES(1,'feculent');
INSERT INTO tags_on_icons VALUES(3,'pepper');
INSERT INTO tags_on_icons VALUES(3,'vegetables');
INSERT INTO tags_on_icons VALUES(3,'yellow');
INSERT INTO tags_on_icons VALUES(4,'vegetables');
INSERT INTO tags_on_icons VALUES(4,'red');
INSERT INTO tags_on_icons VALUES(4,'pepper');
INSERT INTO tags_on_icons VALUES(5,'vegetables');
INSERT INTO tags_on_icons VALUES(5,'garlic');
INSERT INTO tags_on_icons VALUES(6,'curry');
INSERT INTO tags_on_icons VALUES(6,'spices');
INSERT INTO tags_on_icons VALUES(7,'condiment');
INSERT INTO tags_on_icons VALUES(7,'salt');
INSERT INTO tags_on_icons VALUES(8,'black');
INSERT INTO tags_on_icons VALUES(8,'condiment');
INSERT INTO tags_on_icons VALUES(8,'seasoning');
INSERT INTO tags_on_icons VALUES(8,'pepper');
INSERT INTO tags_on_icons VALUES(9,'chicken');
INSERT INTO tags_on_icons VALUES(9,'meat');
INSERT INTO tags_on_icons VALUES(9,'breast');
INSERT INTO tags_on_icons VALUES(10,'coconut');
INSERT INTO tags_on_icons VALUES(10,'liquids');
INSERT INTO tags_on_icons VALUES(10,'milk');
INSERT INTO tags_on_icons VALUES(11,'onion');
INSERT INTO tags_on_icons VALUES(11,'red');
INSERT INTO tags_on_icons VALUES(14,'egg');
INSERT INTO tags_on_icons VALUES(14,'proteins');
INSERT INTO tags_on_icons VALUES(15,'salad');
INSERT INTO tags_on_icons VALUES(15,'vegetables');
INSERT INTO tags_on_icons VALUES(16,'tomato');
INSERT INTO tags_on_icons VALUES(16,'fruits');
INSERT INTO tags_on_icons VALUES(16,'vegetables');
INSERT INTO tags_on_icons VALUES(17,'parmesan');
INSERT INTO tags_on_icons VALUES(17,'products');
INSERT INTO tags_on_icons VALUES(17,'dairy');
INSERT INTO tags_on_icons VALUES(17,'cheese');
INSERT INTO tags_on_icons VALUES(18,'oil');
INSERT INTO tags_on_icons VALUES(18,'liquids');
INSERT INTO tags_on_icons VALUES(19,'mustard');
INSERT INTO tags_on_icons VALUES(19,'sauce');
INSERT INTO tags_on_icons VALUES(19,'condiments');
INSERT INTO tags_on_icons VALUES(20,'dairy');
INSERT INTO tags_on_icons VALUES(20,'yogurt');
INSERT INTO tags_on_icons VALUES(20,'greek');
INSERT INTO tags_on_icons VALUES(20,'produtcs');
INSERT INTO tags_on_icons VALUES(21,'vinegar');
INSERT INTO tags_on_icons VALUES(21,'condiments');
INSERT INTO tags_on_icons VALUES(23,'honey');
INSERT INTO tags_on_icons VALUES(23,'condiments');
INSERT INTO tags_on_icons VALUES(23,'sugar');
INSERT INTO tags_on_icons VALUES(24,'bread');
INSERT INTO tags_on_icons VALUES(24,'croutons');
INSERT INTO tags_on_icons VALUES(25,'spices');
INSERT INTO tags_on_icons VALUES(25,'oriental');
INSERT INTO tags_on_icons VALUES(25,'cumin');
INSERT INTO tags_on_icons VALUES(28,'carrots');
INSERT INTO tags_on_icons VALUES(28,'vegetables');
INSERT INTO tags_on_icons VALUES(29,'tomato');
INSERT INTO tags_on_icons VALUES(29,'vegetables');
INSERT INTO tags_on_icons VALUES(29,'puree');
INSERT INTO tags_on_icons VALUES(30,'pasta');
INSERT INTO tags_on_icons VALUES(30,'feculent');
INSERT INTO tags_on_icons VALUES(31,'vegetables');
INSERT INTO tags_on_icons VALUES(31,'zucchini');
INSERT INTO tags_on_icons VALUES(32,'eggplants');
INSERT INTO tags_on_icons VALUES(32,'vegetables');
INSERT INTO tags_on_icons VALUES(33,'sesame');
INSERT INTO tags_on_icons VALUES(33,'seed');
INSERT INTO tags_on_icons VALUES(34,'beef');
INSERT INTO tags_on_icons VALUES(34,'meat');
INSERT INTO tags_on_icons VALUES(35,'ginger');
INSERT INTO tags_on_icons VALUES(35,'condiments');
INSERT INTO tags_on_icons VALUES(36,'wine');
INSERT INTO tags_on_icons VALUES(36,'liquids');
INSERT INTO tags_on_icons VALUES(37,'cheese');
INSERT INTO tags_on_icons VALUES(37,'products');
INSERT INTO tags_on_icons VALUES(37,'dairy');
INSERT INTO tags_on_icons VALUES(37,'mozarella');
INSERT INTO tags_on_icons VALUES(38,'vegetables');
INSERT INTO tags_on_icons VALUES(38,'cucumber');
INSERT INTO tags_on_icons VALUES(39,'basilic');
INSERT INTO tags_on_icons VALUES(39,'plants');
INSERT INTO tags_on_icons VALUES(40,'vegetables');
INSERT INTO tags_on_icons VALUES(40,'mushroom');
INSERT INTO tags_on_icons VALUES(41,'aromatic');
INSERT INTO tags_on_icons VALUES(41,'oregano');
INSERT INTO tags_on_icons VALUES(41,'condiments');
INSERT INTO tags_on_icons VALUES(41,'herbs');
INSERT INTO tags_on_icons VALUES(42,'cream');
INSERT INTO tags_on_icons VALUES(42,'products');
INSERT INTO tags_on_icons VALUES(42,'dairy');
INSERT INTO tags_on_icons VALUES(43,'eggs');
INSERT INTO tags_on_icons VALUES(44,'pork');
INSERT INTO tags_on_icons VALUES(44,'meat');
INSERT INTO tags_on_icons VALUES(45,'pepper');
INSERT INTO tags_on_icons VALUES(45,'french');
INSERT INTO tags_on_icons VALUES(45,'espelette');
INSERT INTO tags_on_icons VALUES(46,'meat');
INSERT INTO tags_on_icons VALUES(46,'chicken');
INSERT INTO tags_on_icons VALUES(47,'herbs');
INSERT INTO tags_on_icons VALUES(47,'laurel');
INSERT INTO tags_on_icons VALUES(47,'thyme');
INSERT INTO tags_on_icons VALUES(48,'juice');
INSERT INTO tags_on_icons VALUES(48,'liquids');
INSERT INTO tags_on_icons VALUES(48,'orange');
INSERT INTO tags_on_icons VALUES(49,'dairy');
INSERT INTO tags_on_icons VALUES(49,'butter');
INSERT INTO tags_on_icons VALUES(49,'products');
INSERT INTO tags_on_icons VALUES(50,'vegetables');
INSERT INTO tags_on_icons VALUES(50,'onion');
INSERT INTO tags_on_icons VALUES(51,'duck');
INSERT INTO tags_on_icons VALUES(51,'meat');
INSERT INTO tags_on_icons VALUES(52,'lamb');
INSERT INTO tags_on_icons VALUES(52,'meat');
INSERT INTO tags_on_icons VALUES(52,'raw');
INSERT INTO tags_on_icons VALUES(53,'semolina');
INSERT INTO tags_on_icons VALUES(53,'feculent');
INSERT INTO tags_on_icons VALUES(53,'wheat');
INSERT INTO tags_on_icons VALUES(54,'sausage');
INSERT INTO tags_on_icons VALUES(54,'meat');
INSERT INTO tags_on_icons VALUES(55,'chickpea');
INSERT INTO tags_on_icons VALUES(55,'legume');
INSERT INTO tags_on_icons VALUES(56,'turnip');
INSERT INTO tags_on_icons VALUES(56,'vegetables');
INSERT INTO tags_on_icons VALUES(57,'wine');
INSERT INTO tags_on_icons VALUES(57,'liquids');
INSERT INTO tags_on_icons VALUES(58,'cornstarch');
INSERT INTO tags_on_icons VALUES(58,'condiments');
INSERT INTO tags_on_icons VALUES(59,'vinegar');
INSERT INTO tags_on_icons VALUES(59,'liquids');
INSERT INTO tags_on_icons VALUES(60,'legume');
INSERT INTO tags_on_icons VALUES(60,'cashew');
INSERT INTO tags_on_icons VALUES(61,'chicken');
INSERT INTO tags_on_icons VALUES(61,'poultry');
INSERT INTO tags_on_icons VALUES(61,'condiments');
INSERT INTO tags_on_icons VALUES(62,'beef');
INSERT INTO tags_on_icons VALUES(62,'condiments');
INSERT INTO tags_on_icons VALUES(62,'broth');
INSERT INTO tags_on_icons VALUES(63,'legume');
INSERT INTO tags_on_icons VALUES(63,'beans');
INSERT INTO tags_on_icons VALUES(64,'chili');
INSERT INTO tags_on_icons VALUES(64,'spices');
INSERT INTO tags_on_icons VALUES(64,'powder');
INSERT INTO tags_on_icons VALUES(65,'parsley');
INSERT INTO tags_on_icons VALUES(65,'condiments');
INSERT INTO tags_on_icons VALUES(65,'herbs');
INSERT INTO tags_on_icons VALUES(65,'aromatic');
INSERT INTO tags_on_icons VALUES(66,'peas');
INSERT INTO tags_on_icons VALUES(66,'vegetables');
INSERT INTO tags_on_icons VALUES(67,'lemon');
INSERT INTO tags_on_icons VALUES(67,'fruits');
INSERT INTO tags_on_icons VALUES(67,'juice');
INSERT INTO tags_on_icons VALUES(68,'meat');
INSERT INTO tags_on_icons VALUES(68,'ham');
INSERT INTO tags_on_icons VALUES(69,'brown');
INSERT INTO tags_on_icons VALUES(69,'suger');
INSERT INTO tags_on_icons VALUES(70,'vegetables');
INSERT INTO tags_on_icons VALUES(70,'shallot');
INSERT INTO tags_on_icons VALUES(71,'corn');
INSERT INTO tags_on_icons VALUES(71,'vegetables');
INSERT INTO tags_on_icons VALUES(22,'condiment');
INSERT INTO tags_on_icons VALUES(22,'soya');
INSERT INTO tags_on_icons VALUES(22,'sauce');
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO users VALUES('17e86f95-61f7-40e7-ae66-2b89acd99d1b','steeve.matou@gmail.com','$2a$10$8f75kbiicIPvchX5YCjkV.3XnNGU3sUhFetpeDulylu4waovrQM1C',0,1690061763982,1690061763982);
INSERT INTO users VALUES('48ef8bbf-4722-470a-a68b-40631043643e','marie@gmail.com','$2a$10$eunKFnRCJhF01bVO6UDgYeG8PYPXpwxHXDgLgsK7Ys/T4WwOe784y',0,1690061895748,1690061895748);
CREATE TABLE IF NOT EXISTS "activity_levels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activity_level" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "factor" DECIMAL NOT NULL
);
CREATE TABLE IF NOT EXISTS "profiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "username" TEXT,
    "avatar" TEXT,
    "age" DATETIME,
    "height" INTEGER,
    "weight" DECIMAL,
    "gender_id" INTEGER,
    "activity_level_id" INTEGER,
    CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profiles_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "genders" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "profiles_activity_level_id_fkey" FOREIGN KEY ("activity_level_id") REFERENCES "activity_levels" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO profiles VALUES(3,'17e86f95-61f7-40e7-ae66-2b89acd99d1b','Steeve','https://lh3.googleusercontent.com/a/AAcHTtd6rGZQ6ZoncySkDDJgfp_pkCccEq67y_QjdMfQTIhrhg=s96-c',NULL,NULL,NULL,NULL,NULL);
INSERT INTO profiles VALUES(4,'48ef8bbf-4722-470a-a68b-40631043643e','marie k.',NULL,NULL,NULL,NULL,NULL,NULL);
CREATE TABLE IF NOT EXISTS "unit_measures" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "abreviation" TEXT NOT NULL,
    "equivalent" DECIMAL,
    "unit" TEXT NOT NULL DEFAULT 'grams'
);
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
CREATE TABLE IF NOT EXISTS "categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
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
CREATE TABLE IF NOT EXISTS "macros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "food" TEXT,
    "calories" DECIMAL NOT NULL,
    "proteins" DECIMAL NOT NULL,
    "carbs" DECIMAL NOT NULL,
    "fat" DECIMAL NOT NULL,
    "water" DECIMAL NOT NULL
);
INSERT INTO macros VALUES(1,'rice (raw)',349,7.7000000000000001776,77.790000000000006251,0.9000000000000000222,12.400000000000000355);
INSERT INTO macros VALUES(2,'chicken',121,26,0,1.6990000000000000657,72.5);
INSERT INTO macros VALUES(3,'pepper',29,1,4.2000000000000001776,0.2000000000000000111,92);
INSERT INTO macros VALUES(4,'onions',36,1,6.7000000000000001776,0,90);
INSERT INTO macros VALUES(5,'curry',301,14.5,2.6000000000000000888,14,8.8000000000000007105);
INSERT INTO macros VALUES(6,'coconut milk',192,2,6.2000000000000001776,18,0);
INSERT INTO macros VALUES(7,'garlic',130,7.9000000000000003552,21.5,0.4000000000000000222,63.490000000000001989);
INSERT INTO macros VALUES(19,NULL,685.2999999999999545,49.100000000000001421,81.900000000000005686,17.10000000000000142,238.59999999999999431);
INSERT INTO macros VALUES(20,'eggs',145,12.689999999999999503,0.29989999999999999991,9.9000000000000003552,76.290000000000006254);
INSERT INTO macros VALUES(21,'salad',11,1,1,0.10000000000000000555,96);
INSERT INTO macros VALUES(22,'tomato',20,0.8000000000000000444,1.6990000000000000657,0.29989999999999999991,94.48999999999999488);
INSERT INTO macros VALUES(23,'bread croutons',495,7.7990000000000003765,45.289999999999999147,30,0);
INSERT INTO macros VALUES(24,'parmesan',441,31,2,31,23);
INSERT INTO macros VALUES(25,'soy sauce',44,4.7990000000000003765,6.2990000000000003765,0,72);
INSERT INTO macros VALUES(26,'red wine vinegar',88,0.5,17,0,76.5);
INSERT INTO macros VALUES(27,'mustard',165,6.9000000000000003552,2.3990000000000000213,14,68);
INSERT INTO macros VALUES(28,'greek yogurt',113,3.2989999999999999324,4.2000000000000001776,9.1989999999999998436,80.40000000000000568);
INSERT INTO macros VALUES(29,'honey',327,0.4000000000000000222,81.090000000000003414,0.10000000000000000555,18.190000000000001278);
INSERT INTO macros VALUES(30,'oil',899,0.10000000000000000555,0.10000000000000000555,99.900000000000005687,0);
INSERT INTO macros VALUES(31,'cumin',433,17.80000000000000071,33.700000000000002841,22.300000000000000711,0);
INSERT INTO macros VALUES(32,NULL,451,51.289999999999999146,15.80000000000000071,18.390000000000000568,304.30000000000001136);
INSERT INTO macros VALUES(33,'ginger',521,6.9000000000000003552,44.600000000000001422,35,0.5);
INSERT INTO macros VALUES(34,'beef',163,30.10000000000000142,0,3.8990000000000000213,65);
INSERT INTO macros VALUES(35,'sesame seeds',517,17.690000000000001278,9.9000000000000003552,49.700000000000002843,4);
INSERT INTO macros VALUES(36,'eggplant',32.700000000000002842,1.3000000000000000444,4.2000000000000001776,0.2000000000000000111,88.500000000000000003);
INSERT INTO macros VALUES(37,'zucchini',16,0.9000000000000000222,1.3990000000000000213,0.4000000000000000222,93.790000000000006254);
INSERT INTO macros VALUES(41,'pasta',151,4.9000000000000003552,29.690000000000001278,0.8000000000000000444,62.100000000000001422);
INSERT INTO macros VALUES(42,'carrots',40.20000000000000284,0.5,7.5990000000000001989,0.2000000000000000111,88);
INSERT INTO macros VALUES(43,'tomato puree',31.600000000000001421,1.6000000000000000888,3.1000000000000000888,1.3000000000000000444,89.400000000000005686);
INSERT INTO macros VALUES(44,'mozzarella',300,22.190000000000001279,2.2000000000000001776,22.390000000000000568,52);
INSERT INTO macros VALUES(45,'cucumber',15,0.5,3,0.10000000000000000555,95.20000000000000284);
INSERT INTO macros VALUES(46,'mushroom',21.690000000000001279,2.3990000000000000213,1.8990000000000000213,0.2000000000000000111,92.5);
INSERT INTO macros VALUES(47,'fresh cream 15%',170,2.5,6.2000000000000001776,15,72.5);
INSERT INTO macros VALUES(48,'yolk',339,16.5,0.5,30.10000000000000142,50);
INSERT INTO macros VALUES(49,'pork',312,16.5,0,27.300000000000000711,54);
INSERT INTO macros VALUES(50,'orange juice',45,0.59999999999999997779,10.400000000000000355,0.2000000000000000111,88.200000000000002842);
INSERT INTO macros VALUES(51,'butter',717,0.8000000000000000444,0.10000000000000000555,81,17.80000000000000071);
INSERT INTO macros VALUES(52,'green onion',30,2.6000000000000000888,2.1000000000000000888,0.5,89.700000000000002838);
INSERT INTO macros VALUES(53,'duck',205,26.600000000000001421,0,10.900000000000000354,63);
INSERT INTO macros VALUES(54,'lamb',219,22.60000000000000142,0,14.089999999999999857,60.500000000000000001);
INSERT INTO macros VALUES(55,'semolina',360,12.599999999999999644,72.70000000000000284,1.1000000000000000888,12.599999999999999644);
INSERT INTO macros VALUES(56,'chickpea',164,8.9000000000000003552,27.390000000000000568,2.6000000000000000888,60.20000000000000284);
INSERT INTO macros VALUES(57,'turnip',28,0.9000000000000000222,6.4000000000000003552,0.10000000000000000555,91.900000000000005686);
INSERT INTO macros VALUES(58,'celeri',16,1.1990000000000000657,1.1000000000000000888,0.2000000000000000111,90);
INSERT INTO macros VALUES(59,'pea',87,5.4000000000000003552,12.689999999999999503,0.4000000000000000222,75);
INSERT INTO macros VALUES(60,'lemon juice',27.60000000000000142,0.2000000000000000111,2.7000000000000001776,0.10000000000000000555,91.700000000000002845);
INSERT INTO macros VALUES(61,'red beans',115,9.5,12,0.5,65);
INSERT INTO macros VALUES(62,'cashew',631,19.80000000000000071,21.800000000000000709,49.100000000000001421,16);
INSERT INTO macros VALUES(63,'rice vinegar',30,0.10000000000000000555,6.4000000000000003552,0.4000000000000000222,93);
INSERT INTO macros VALUES(64,'sugar',398,0,99.590000000000003408,0,0);
INSERT INTO macros VALUES(65,'cornstarch',381,0.2000000000000000111,91.290000000000006254,0.10000000000000000555,8.3000000000000007105);
INSERT INTO macros VALUES(66,'red wine',85,0,2.6000000000000000888,0,86.400000000000005684);
INSERT INTO macros VALUES(68,'shallot',76,1.6000000000000000888,15.900000000000000354,0.2000000000000000111,79);
INSERT INTO macros VALUES(69,'tomato concentrate',82,4.2990000000000003765,18.80000000000000071,0.5,73.400000000000005682);
INSERT INTO macros VALUES(70,NULL,632.79999999999995453,32.700000000000002842,40.299999999999997156,35.700000000000002842,149.59999999999999431);
INSERT INTO macros VALUES(71,NULL,603.79999999999995454,72.5,61.799999999999997157,5.4000000000000003552,385.10000000000002274);
INSERT INTO macros VALUES(72,NULL,935.2999999999999545,94,75.20000000000000284,27,497.30000000000001134);
INSERT INTO macros VALUES(73,NULL,506.80000000000001137,46.200000000000002843,61.700000000000002841,8.3000000000000007105,174.90000000000000567);
INSERT INTO macros VALUES(74,NULL,373.10000000000002272,27.60000000000000142,46.600000000000001421,7.9000000000000003552,114.90000000000000568);
INSERT INTO macros VALUES(75,'corn',365,9.4000000000000003552,74,4.7000000000000001776,10.400000000000000355);
INSERT INTO macros VALUES(76,NULL,401.30000000000001138,38.100000000000001421,40.789999999999999149,7,215.40000000000000567);
INSERT INTO macros VALUES(77,NULL,316.80000000000001136,36.200000000000002841,5,15.900000000000000354,300.10000000000002272);
INSERT INTO macros VALUES(78,NULL,493.39999999999997726,49.700000000000002843,16.5,23.100000000000001421,245.49999999999999999);
INSERT INTO macros VALUES(79,NULL,447.60000000000002271,45.700000000000002842,43.789999999999999146,6.9000000000000003552,390.60000000000002274);
INSERT INTO macros VALUES(80,NULL,397.80000000000001136,47.299999999999997159,38.700000000000002842,4.5,297.10000000000002273);
INSERT INTO macros VALUES(81,NULL,466.60000000000002272,37.700000000000002842,68.200000000000002842,3.2999999999999998223,299.30000000000001136);
CREATE TABLE IF NOT EXISTS "ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "unit_weight" DECIMAL,
    "category_id" INTEGER NOT NULL,
    "macros_id" INTEGER,
    "icon_id" INTEGER,
    CONSTRAINT "ingredients_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ingredients_macros_id_fkey" FOREIGN KEY ("macros_id") REFERENCES "macros" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ingredients_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "icons" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO ingredients VALUES(1,'rice basmati',NULL,3,1,1);
INSERT INTO ingredients VALUES(2,'chicken breast',150,7,2,9);
INSERT INTO ingredients VALUES(3,'red pepper',175,1,3,4);
INSERT INTO ingredients VALUES(4,'yellow pepper',175,1,3,3);
INSERT INTO ingredients VALUES(5,'red onions',80,1,4,11);
INSERT INTO ingredients VALUES(6,'curry',NULL,6,5,6);
INSERT INTO ingredients VALUES(7,'coconut milk',NULL,5,6,10);
INSERT INTO ingredients VALUES(8,'garlic',7,1,7,5);
INSERT INTO ingredients VALUES(9,'black pepper',NULL,4,NULL,8);
INSERT INTO ingredients VALUES(11,'salad',NULL,1,21,15);
INSERT INTO ingredients VALUES(12,'cherry tomatoes',12,1,22,16);
INSERT INTO ingredients VALUES(13,'bread croutons',NULL,4,23,24);
INSERT INTO ingredients VALUES(14,'parmesan',NULL,9,24,17);
INSERT INTO ingredients VALUES(15,'eggs',65,11,20,14);
INSERT INTO ingredients VALUES(16,'soy sauce',NULL,5,25,22);
INSERT INTO ingredients VALUES(17,'red wine vinegar',NULL,4,26,21);
INSERT INTO ingredients VALUES(18,'mustard',NULL,4,27,19);
INSERT INTO ingredients VALUES(19,'greek yogurt',NULL,9,28,20);
INSERT INTO ingredients VALUES(20,'seasame oil',NULL,5,30,18);
INSERT INTO ingredients VALUES(21,'honey',NULL,4,29,23);
INSERT INTO ingredients VALUES(22,'cumin',NULL,6,31,25);
INSERT INTO ingredients VALUES(23,'salt',NULL,4,NULL,7);
INSERT INTO ingredients VALUES(24,'carrots',125,1,42,28);
INSERT INTO ingredients VALUES(25,'tomato puree',NULL,1,43,29);
INSERT INTO ingredients VALUES(26,'pasta',NULL,3,41,30);
INSERT INTO ingredients VALUES(27,'zucchini',500,1,37,31);
INSERT INTO ingredients VALUES(28,'eggplants',225,1,36,32);
INSERT INTO ingredients VALUES(29,'sesame seed',NULL,4,35,33);
INSERT INTO ingredients VALUES(30,'beef',150,7,34,34);
INSERT INTO ingredients VALUES(31,'ginger',NULL,4,33,35);
INSERT INTO ingredients VALUES(32,'tomatoes',200,1,22,16);
INSERT INTO ingredients VALUES(33,'white wine',NULL,5,NULL,36);
INSERT INTO ingredients VALUES(34,'mozarella',125,9,44,37);
INSERT INTO ingredients VALUES(35,'cucumber',350,1,45,38);
INSERT INTO ingredients VALUES(36,'basilic',NULL,4,NULL,39);
INSERT INTO ingredients VALUES(37,'mushroom',NULL,1,46,40);
INSERT INTO ingredients VALUES(38,'oregano',NULL,4,NULL,41);
INSERT INTO ingredients VALUES(39,'fresh cream 15%',NULL,9,47,42);
INSERT INTO ingredients VALUES(40,'yolk',20,11,48,43);
INSERT INTO ingredients VALUES(41,'pork bellys moked',NULL,7,49,44);
INSERT INTO ingredients VALUES(42,'espelette pepper',NULL,4,NULL,45);
INSERT INTO ingredients VALUES(43,'chicken leg',250,7,2,46);
INSERT INTO ingredients VALUES(44,'mixed herbs',NULL,4,NULL,47);
INSERT INTO ingredients VALUES(45,'orange juice',NULL,5,50,48);
INSERT INTO ingredients VALUES(46,'butter',NULL,9,51,49);
INSERT INTO ingredients VALUES(47,'green onion',100,1,52,50);
INSERT INTO ingredients VALUES(48,'duck breast',380,7,53,51);
INSERT INTO ingredients VALUES(49,'neck of lamb',NULL,7,54,52);
INSERT INTO ingredients VALUES(50,'semolina',NULL,3,55,53);
INSERT INTO ingredients VALUES(51,'merguez',80,7,34,54);
INSERT INTO ingredients VALUES(52,'chickpea',NULL,11,56,55);
INSERT INTO ingredients VALUES(53,'turnip',100,1,57,56);
INSERT INTO ingredients VALUES(54,'beef broth',NULL,4,NULL,62);
INSERT INTO ingredients VALUES(55,'parsley',NULL,4,NULL,65);
INSERT INTO ingredients VALUES(56,'brown sugar',NULL,4,64,69);
INSERT INTO ingredients VALUES(57,'cashew',NULL,2,62,60);
INSERT INTO ingredients VALUES(58,'rice vinegar',NULL,5,63,59);
INSERT INTO ingredients VALUES(59,'cornstarch',NULL,4,NULL,58);
INSERT INTO ingredients VALUES(60,'chicken broth',NULL,4,NULL,61);
INSERT INTO ingredients VALUES(61,'shallot',25,1,68,70);
INSERT INTO ingredients VALUES(62,'chili',NULL,6,NULL,64);
INSERT INTO ingredients VALUES(63,'red beans',NULL,11,61,63);
INSERT INTO ingredients VALUES(64,'tomato concentrate',NULL,4,69,29);
INSERT INTO ingredients VALUES(65,'cooked ham slice',50,7,49,68);
INSERT INTO ingredients VALUES(66,'pea',NULL,1,59,66);
INSERT INTO ingredients VALUES(67,'olive oil',NULL,5,30,18);
INSERT INTO ingredients VALUES(68,'lemon juice',45,4,60,67);
INSERT INTO ingredients VALUES(69,'corn',NULL,1,75,71);
CREATE TABLE IF NOT EXISTS "ingredients_on_recipes" (
    "qty" DECIMAL NOT NULL,
    "unit_measure_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    PRIMARY KEY ("ingredient_id", "recipe_id"),
    CONSTRAINT "ingredients_on_recipes_unit_measure_id_fkey" FOREIGN KEY ("unit_measure_id") REFERENCES "unit_measures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ingredients_on_recipes_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ingredients_on_recipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO ingredients_on_recipes VALUES(360,2,1,1);
INSERT INTO ingredients_on_recipes VALUES(4,10,2,1);
INSERT INTO ingredients_on_recipes VALUES(1,10,3,1);
INSERT INTO ingredients_on_recipes VALUES(1,10,4,1);
INSERT INTO ingredients_on_recipes VALUES(2,10,5,1);
INSERT INTO ingredients_on_recipes VALUES(2,6,6,1);
INSERT INTO ingredients_on_recipes VALUES(300,5,7,1);
INSERT INTO ingredients_on_recipes VALUES(2,8,8,1);
INSERT INTO ingredients_on_recipes VALUES(1,9,9,1);
INSERT INTO ingredients_on_recipes VALUES(1,9,23,1);
INSERT INTO ingredients_on_recipes VALUES(200,2,11,2);
INSERT INTO ingredients_on_recipes VALUES(3,10,2,2);
INSERT INTO ingredients_on_recipes VALUES(250,2,12,2);
INSERT INTO ingredients_on_recipes VALUES(75,2,13,2);
INSERT INTO ingredients_on_recipes VALUES(3,10,15,2);
INSERT INTO ingredients_on_recipes VALUES(3,6,14,2);
INSERT INTO ingredients_on_recipes VALUES(2,6,16,2);
INSERT INTO ingredients_on_recipes VALUES(2,6,17,2);
INSERT INTO ingredients_on_recipes VALUES(1,7,18,2);
INSERT INTO ingredients_on_recipes VALUES(2,6,19,2);
INSERT INTO ingredients_on_recipes VALUES(1,9,9,2);
INSERT INTO ingredients_on_recipes VALUES(2,6,20,2);
INSERT INTO ingredients_on_recipes VALUES(1,7,21,2);
INSERT INTO ingredients_on_recipes VALUES(1,7,22,2);
INSERT INTO ingredients_on_recipes VALUES(400,2,26,3);
INSERT INTO ingredients_on_recipes VALUES(100,2,14,3);
INSERT INTO ingredients_on_recipes VALUES(1,10,15,3);
INSERT INTO ingredients_on_recipes VALUES(2,10,40,3);
INSERT INTO ingredients_on_recipes VALUES(200,2,41,3);
INSERT INTO ingredients_on_recipes VALUES(1,9,9,3);
INSERT INTO ingredients_on_recipes VALUES(280,2,1,13);
INSERT INTO ingredients_on_recipes VALUES(4,10,43,13);
INSERT INTO ingredients_on_recipes VALUES(1,9,23,13);
INSERT INTO ingredients_on_recipes VALUES(1,9,9,13);
INSERT INTO ingredients_on_recipes VALUES(2,10,32,13);
INSERT INTO ingredients_on_recipes VALUES(1,10,3,13);
INSERT INTO ingredients_on_recipes VALUES(1,10,4,13);
INSERT INTO ingredients_on_recipes VALUES(2,8,8,13);
INSERT INTO ingredients_on_recipes VALUES(1,10,5,13);
INSERT INTO ingredients_on_recipes VALUES(1,7,42,13);
INSERT INTO ingredients_on_recipes VALUES(0.5,7,38,13);
INSERT INTO ingredients_on_recipes VALUES(1,10,44,13);
INSERT INTO ingredients_on_recipes VALUES(1,7,60,13);
INSERT INTO ingredients_on_recipes VALUES(0.25,11,33,13);
INSERT INTO ingredients_on_recipes VALUES(1,9,55,13);
INSERT INTO ingredients_on_recipes VALUES(400,2,49,5);
INSERT INTO ingredients_on_recipes VALUES(200,2,50,5);
INSERT INTO ingredients_on_recipes VALUES(2,10,43,5);
INSERT INTO ingredients_on_recipes VALUES(4,10,51,5);
INSERT INTO ingredients_on_recipes VALUES(250,2,52,5);
INSERT INTO ingredients_on_recipes VALUES(50,2,64,5);
INSERT INTO ingredients_on_recipes VALUES(4,10,53,5);
INSERT INTO ingredients_on_recipes VALUES(4,10,24,5);
INSERT INTO ingredients_on_recipes VALUES(2,10,5,5);
INSERT INTO ingredients_on_recipes VALUES(2,8,8,5);
INSERT INTO ingredients_on_recipes VALUES(20,2,46,5);
INSERT INTO ingredients_on_recipes VALUES(4,6,67,5);
INSERT INTO ingredients_on_recipes VALUES(1,9,23,5);
INSERT INTO ingredients_on_recipes VALUES(4,10,2,12);
INSERT INTO ingredients_on_recipes VALUES(0.5,11,16,12);
INSERT INTO ingredients_on_recipes VALUES(0.69999999999999995559,11,45,12);
INSERT INTO ingredients_on_recipes VALUES(3,6,21,12);
INSERT INTO ingredients_on_recipes VALUES(1,7,20,12);
INSERT INTO ingredients_on_recipes VALUES(1,7,31,12);
INSERT INTO ingredients_on_recipes VALUES(1,6,67,12);
INSERT INTO ingredients_on_recipes VALUES(1,9,29,12);
INSERT INTO ingredients_on_recipes VALUES(15,2,46,12);
INSERT INTO ingredients_on_recipes VALUES(1,9,47,12);
INSERT INTO ingredients_on_recipes VALUES(280,2,1,12);
INSERT INTO ingredients_on_recipes VALUES(350,2,1,11);
INSERT INTO ingredients_on_recipes VALUES(3,10,2,11);
INSERT INTO ingredients_on_recipes VALUES(2,10,65,11);
INSERT INTO ingredients_on_recipes VALUES(2,10,68,11);
INSERT INTO ingredients_on_recipes VALUES(5,6,66,11);
INSERT INTO ingredients_on_recipes VALUES(1,9,55,11);
INSERT INTO ingredients_on_recipes VALUES(2,10,47,11);
INSERT INTO ingredients_on_recipes VALUES(5,6,20,11);
INSERT INTO ingredients_on_recipes VALUES(3,6,67,11);
INSERT INTO ingredients_on_recipes VALUES(1,9,23,11);
INSERT INTO ingredients_on_recipes VALUES(1,9,9,11);
INSERT INTO ingredients_on_recipes VALUES(140,2,69,10);
INSERT INTO ingredients_on_recipes VALUES(1.5,10,5,10);
INSERT INTO ingredients_on_recipes VALUES(2,8,8,10);
INSERT INTO ingredients_on_recipes VALUES(250,2,63,10);
INSERT INTO ingredients_on_recipes VALUES(350,2,30,10);
INSERT INTO ingredients_on_recipes VALUES(1,10,3,10);
INSERT INTO ingredients_on_recipes VALUES(1,6,22,10);
INSERT INTO ingredients_on_recipes VALUES(2,6,62,10);
INSERT INTO ingredients_on_recipes VALUES(200,2,25,10);
INSERT INTO ingredients_on_recipes VALUES(1,9,23,10);
INSERT INTO ingredients_on_recipes VALUES(1,9,9,10);
INSERT INTO ingredients_on_recipes VALUES(1,6,54,10);
INSERT INTO ingredients_on_recipes VALUES(200,2,11,9);
INSERT INTO ingredients_on_recipes VALUES(2,10,2,9);
INSERT INTO ingredients_on_recipes VALUES(1,10,34,9);
INSERT INTO ingredients_on_recipes VALUES(4,10,15,9);
INSERT INTO ingredients_on_recipes VALUES(1,10,35,9);
INSERT INTO ingredients_on_recipes VALUES(2,6,17,9);
INSERT INTO ingredients_on_recipes VALUES(3,6,67,9);
INSERT INTO ingredients_on_recipes VALUES(1,9,23,9);
INSERT INTO ingredients_on_recipes VALUES(1,9,9,9);
INSERT INTO ingredients_on_recipes VALUES(1,7,18,9);
INSERT INTO ingredients_on_recipes VALUES(1,6,19,9);
INSERT INTO ingredients_on_recipes VALUES(200,2,12,9);
INSERT INTO ingredients_on_recipes VALUES(4,10,2,6);
INSERT INTO ingredients_on_recipes VALUES(160,2,57,6);
INSERT INTO ingredients_on_recipes VALUES(2,6,16,6);
INSERT INTO ingredients_on_recipes VALUES(1,6,58,6);
INSERT INTO ingredients_on_recipes VALUES(1,6,59,6);
INSERT INTO ingredients_on_recipes VALUES(1,6,20,6);
INSERT INTO ingredients_on_recipes VALUES(1,7,42,6);
INSERT INTO ingredients_on_recipes VALUES(1,7,9,6);
INSERT INTO ingredients_on_recipes VALUES(4,8,8,6);
INSERT INTO ingredients_on_recipes VALUES(2,6,31,6);
INSERT INTO ingredients_on_recipes VALUES(2,10,3,6);
INSERT INTO ingredients_on_recipes VALUES(2,10,47,6);
INSERT INTO ingredients_on_recipes VALUES(1,7,56,6);
INSERT INTO ingredients_on_recipes VALUES(1,10,5,7);
INSERT INTO ingredients_on_recipes VALUES(2,10,24,7);
INSERT INTO ingredients_on_recipes VALUES(500,2,32,7);
INSERT INTO ingredients_on_recipes VALUES(50,2,64,7);
INSERT INTO ingredients_on_recipes VALUES(1,6,54,7);
INSERT INTO ingredients_on_recipes VALUES(200,2,25,7);
INSERT INTO ingredients_on_recipes VALUES(400,2,26,7);
INSERT INTO ingredients_on_recipes VALUES(500,2,30,7);
INSERT INTO ingredients_on_recipes VALUES(0.25,11,33,7);
INSERT INTO ingredients_on_recipes VALUES(2,8,8,7);
INSERT INTO ingredients_on_recipes VALUES(1,7,56,7);
INSERT INTO ingredients_on_recipes VALUES(4,10,2,4);
INSERT INTO ingredients_on_recipes VALUES(400,2,26,4);
INSERT INTO ingredients_on_recipes VALUES(400,2,37,4);
INSERT INTO ingredients_on_recipes VALUES(6,10,61,4);
INSERT INTO ingredients_on_recipes VALUES(2,6,18,4);
INSERT INTO ingredients_on_recipes VALUES(2,6,39,4);
INSERT INTO ingredients_on_recipes VALUES(1,6,38,4);
INSERT INTO ingredients_on_recipes VALUES(3,8,8,4);
INSERT INTO ingredients_on_recipes VALUES(1,9,23,4);
INSERT INTO ingredients_on_recipes VALUES(1,9,9,4);
INSERT INTO ingredients_on_recipes VALUES(0.25,11,33,4);
INSERT INTO ingredients_on_recipes VALUES(1,6,60,4);
INSERT INTO ingredients_on_recipes VALUES(3,6,67,4);
INSERT INTO ingredients_on_recipes VALUES(1,10,4,7);
INSERT INTO ingredients_on_recipes VALUES(1,10,27,7);
INSERT INTO ingredients_on_recipes VALUES(3,10,2,7);
INSERT INTO ingredients_on_recipes VALUES(3,6,16,7);
INSERT INTO ingredients_on_recipes VALUES(0.5,7,42,7);
INSERT INTO ingredients_on_recipes VALUES(1,10,28,7);
INSERT INTO ingredients_on_recipes VALUES(1,9,23,7);
INSERT INTO ingredients_on_recipes VALUES(1,9,9,7);
INSERT INTO ingredients_on_recipes VALUES(320,2,1,7);
CREATE TABLE IF NOT EXISTS "instructions_on_recipes" (
    "instruction_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    PRIMARY KEY ("recipe_id", "instruction_id"),
    CONSTRAINT "instructions_on_recipes_instruction_id_fkey" FOREIGN KEY ("instruction_id") REFERENCES "instructions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "instructions_on_recipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO instructions_on_recipes VALUES(60,1);
INSERT INTO instructions_on_recipes VALUES(61,1);
INSERT INTO instructions_on_recipes VALUES(62,1);
INSERT INTO instructions_on_recipes VALUES(63,1);
INSERT INTO instructions_on_recipes VALUES(64,1);
INSERT INTO instructions_on_recipes VALUES(65,2);
INSERT INTO instructions_on_recipes VALUES(66,2);
INSERT INTO instructions_on_recipes VALUES(67,2);
INSERT INTO instructions_on_recipes VALUES(68,2);
INSERT INTO instructions_on_recipes VALUES(69,2);
INSERT INTO instructions_on_recipes VALUES(70,2);
INSERT INTO instructions_on_recipes VALUES(71,2);
INSERT INTO instructions_on_recipes VALUES(72,2);
INSERT INTO instructions_on_recipes VALUES(73,3);
INSERT INTO instructions_on_recipes VALUES(74,3);
INSERT INTO instructions_on_recipes VALUES(75,3);
INSERT INTO instructions_on_recipes VALUES(76,3);
INSERT INTO instructions_on_recipes VALUES(77,3);
INSERT INTO instructions_on_recipes VALUES(78,3);
INSERT INTO instructions_on_recipes VALUES(79,3);
INSERT INTO instructions_on_recipes VALUES(80,13);
INSERT INTO instructions_on_recipes VALUES(81,13);
INSERT INTO instructions_on_recipes VALUES(82,13);
INSERT INTO instructions_on_recipes VALUES(83,13);
INSERT INTO instructions_on_recipes VALUES(84,13);
INSERT INTO instructions_on_recipes VALUES(85,13);
INSERT INTO instructions_on_recipes VALUES(86,13);
INSERT INTO instructions_on_recipes VALUES(87,13);
INSERT INTO instructions_on_recipes VALUES(88,13);
INSERT INTO instructions_on_recipes VALUES(89,5);
INSERT INTO instructions_on_recipes VALUES(90,5);
INSERT INTO instructions_on_recipes VALUES(91,5);
INSERT INTO instructions_on_recipes VALUES(92,5);
INSERT INTO instructions_on_recipes VALUES(93,5);
INSERT INTO instructions_on_recipes VALUES(94,5);
INSERT INTO instructions_on_recipes VALUES(95,5);
INSERT INTO instructions_on_recipes VALUES(96,12);
INSERT INTO instructions_on_recipes VALUES(97,12);
INSERT INTO instructions_on_recipes VALUES(98,12);
INSERT INTO instructions_on_recipes VALUES(99,12);
INSERT INTO instructions_on_recipes VALUES(100,12);
INSERT INTO instructions_on_recipes VALUES(101,12);
INSERT INTO instructions_on_recipes VALUES(102,12);
INSERT INTO instructions_on_recipes VALUES(103,12);
INSERT INTO instructions_on_recipes VALUES(104,12);
INSERT INTO instructions_on_recipes VALUES(105,12);
INSERT INTO instructions_on_recipes VALUES(106,11);
INSERT INTO instructions_on_recipes VALUES(107,11);
INSERT INTO instructions_on_recipes VALUES(108,11);
INSERT INTO instructions_on_recipes VALUES(109,11);
INSERT INTO instructions_on_recipes VALUES(110,11);
INSERT INTO instructions_on_recipes VALUES(111,11);
INSERT INTO instructions_on_recipes VALUES(112,11);
INSERT INTO instructions_on_recipes VALUES(113,10);
INSERT INTO instructions_on_recipes VALUES(114,10);
INSERT INTO instructions_on_recipes VALUES(115,10);
INSERT INTO instructions_on_recipes VALUES(116,10);
INSERT INTO instructions_on_recipes VALUES(117,10);
INSERT INTO instructions_on_recipes VALUES(118,10);
INSERT INTO instructions_on_recipes VALUES(119,10);
INSERT INTO instructions_on_recipes VALUES(120,10);
INSERT INTO instructions_on_recipes VALUES(121,9);
INSERT INTO instructions_on_recipes VALUES(122,9);
INSERT INTO instructions_on_recipes VALUES(123,9);
INSERT INTO instructions_on_recipes VALUES(124,9);
INSERT INTO instructions_on_recipes VALUES(125,9);
INSERT INTO instructions_on_recipes VALUES(126,9);
INSERT INTO instructions_on_recipes VALUES(127,9);
INSERT INTO instructions_on_recipes VALUES(128,8);
INSERT INTO instructions_on_recipes VALUES(129,8);
INSERT INTO instructions_on_recipes VALUES(130,8);
INSERT INTO instructions_on_recipes VALUES(131,8);
INSERT INTO instructions_on_recipes VALUES(132,7);
INSERT INTO instructions_on_recipes VALUES(133,7);
INSERT INTO instructions_on_recipes VALUES(134,7);
INSERT INTO instructions_on_recipes VALUES(135,7);
INSERT INTO instructions_on_recipes VALUES(136,7);
INSERT INTO instructions_on_recipes VALUES(137,4);
INSERT INTO instructions_on_recipes VALUES(138,4);
INSERT INTO instructions_on_recipes VALUES(139,4);
INSERT INTO instructions_on_recipes VALUES(140,4);
INSERT INTO instructions_on_recipes VALUES(141,4);
INSERT INTO instructions_on_recipes VALUES(142,6);
INSERT INTO instructions_on_recipes VALUES(143,6);
INSERT INTO instructions_on_recipes VALUES(144,6);
INSERT INTO instructions_on_recipes VALUES(145,6);
CREATE TABLE IF NOT EXISTS "reviews" (
    "comment" TEXT,
    "is_liked" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "author_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    CONSTRAINT "reviews_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "reviews_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO reviews VALUES('Amzing !',1,3,1690065282286,NULL,3,1);
INSERT INTO reviews VALUES(NULL,1,NULL,1690065313192,NULL,4,1);
INSERT INTO reviews VALUES(NULL,1,NULL,1690065339113,NULL,4,3);
INSERT INTO reviews VALUES('Top !',0,5,1690065368204,NULL,3,12);
INSERT INTO reviews VALUES('Thanks ! Top recipe !',0,4,1690065432949,NULL,3,6);
CREATE TABLE IF NOT EXISTS "recipes_on_tags" (
    "tag_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    PRIMARY KEY ("tag_id", "recipe_id"),
    CONSTRAINT "recipes_on_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "recipes_on_tags_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO recipes_on_tags VALUES(19,1);
INSERT INTO recipes_on_tags VALUES(10,1);
INSERT INTO recipes_on_tags VALUES(23,1);
INSERT INTO recipes_on_tags VALUES(16,1);
INSERT INTO recipes_on_tags VALUES(16,2);
INSERT INTO recipes_on_tags VALUES(26,2);
INSERT INTO recipes_on_tags VALUES(100,3);
INSERT INTO recipes_on_tags VALUES(101,3);
INSERT INTO recipes_on_tags VALUES(51,3);
INSERT INTO recipes_on_tags VALUES(70,13);
INSERT INTO recipes_on_tags VALUES(102,13);
INSERT INTO recipes_on_tags VALUES(16,13);
INSERT INTO recipes_on_tags VALUES(80,5);
INSERT INTO recipes_on_tags VALUES(103,5);
INSERT INTO recipes_on_tags VALUES(78,5);
INSERT INTO recipes_on_tags VALUES(16,12);
INSERT INTO recipes_on_tags VALUES(104,12);
INSERT INTO recipes_on_tags VALUES(16,11);
INSERT INTO recipes_on_tags VALUES(105,11);
INSERT INTO recipes_on_tags VALUES(56,10);
INSERT INTO recipes_on_tags VALUES(107,10);
INSERT INTO recipes_on_tags VALUES(59,9);
INSERT INTO recipes_on_tags VALUES(16,9);
INSERT INTO recipes_on_tags VALUES(101,9);
INSERT INTO recipes_on_tags VALUES(87,8);
INSERT INTO recipes_on_tags VALUES(16,8);
INSERT INTO recipes_on_tags VALUES(105,8);
INSERT INTO recipes_on_tags VALUES(56,7);
INSERT INTO recipes_on_tags VALUES(51,7);
INSERT INTO recipes_on_tags VALUES(101,7);
INSERT INTO recipes_on_tags VALUES(63,4);
INSERT INTO recipes_on_tags VALUES(51,4);
INSERT INTO recipes_on_tags VALUES(70,4);
INSERT INTO recipes_on_tags VALUES(4,6);
INSERT INTO recipes_on_tags VALUES(16,6);
CREATE TABLE IF NOT EXISTS "meals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipe_name" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "image" TEXT,
    CONSTRAINT "meals_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "meal_plans" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "meal_plans_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "meals_on_meal_plans" (
    "meals_id" INTEGER NOT NULL,
    "meal_plans_id" INTEGER NOT NULL,

    PRIMARY KEY ("meals_id", "meal_plans_id"),
    CONSTRAINT "meals_on_meal_plans_meals_id_fkey" FOREIGN KEY ("meals_id") REFERENCES "meals" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "meals_on_meal_plans_meal_plans_id_fkey" FOREIGN KEY ("meal_plans_id") REFERENCES "meal_plans" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "list_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ingredient_id" INTEGER NOT NULL,
    "qty" DECIMAL NOT NULL,
    "unit_measure_id" INTEGER NOT NULL,
    CONSTRAINT "list_items_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "list_items_unit_measure_id_fkey" FOREIGN KEY ("unit_measure_id") REFERENCES "unit_measures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "shoppin_lists_on_list_items" (
    "list_item_id" INTEGER NOT NULL,
    "shopping_list_id" INTEGER NOT NULL,

    PRIMARY KEY ("list_item_id", "shopping_list_id"),
    CONSTRAINT "shoppin_lists_on_list_items_list_item_id_fkey" FOREIGN KEY ("list_item_id") REFERENCES "list_items" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "shoppin_lists_on_list_items_shopping_list_id_fkey" FOREIGN KEY ("shopping_list_id") REFERENCES "shopping_lists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "shopping_lists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "meal_plan_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "shopping_lists_meal_plan_id_fkey" FOREIGN KEY ("meal_plan_id") REFERENCES "meal_plans" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "recipes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "prep_time" INTEGER NOT NULL,
    "cook_time" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image_id" INTEGER,
    "servings" INTEGER NOT NULL,
    "macros_id" INTEGER,
    "youtube_link" TEXT,
    "level" TEXT NOT NULL,
    CONSTRAINT "recipes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "profiles" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
    CONSTRAINT "recipes_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "recipes_macros_id_fkey" FOREIGN KEY ("macros_id") REFERENCES "macros" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "recipes_level_fkey" FOREIGN KEY ("level") REFERENCES "difficulties" ("name") ON DELETE SET DEFAULT ON UPDATE CASCADE
);
INSERT INTO recipes VALUES(1,'Chicken Curry with Coconut milk',20,20,3,1690062131451,5,4,19,NULL,'easy');
INSERT INTO recipes VALUES(2,'Salad chicken',10,10,3,1690063111609,6,3,32,NULL,'easy');
INSERT INTO recipes VALUES(3,'Carbonara Pasta',10,10,4,1690754400000,7,3,70,NULL,'easy');
INSERT INTO recipes VALUES(4,'Chicken with mushroom and mustard sauce',10,30,3,1690063318993,17,4,80,NULL,'easy');
INSERT INTO recipes VALUES(5,'Couscous royal',30,75,4,1690063318993,9,4,72,NULL,'easy');
INSERT INTO recipes VALUES(6,'Chicken with vegetables',15,20,3,1690063373822,18,4,81,NULL,'easy');
INSERT INTO recipes VALUES(7,'pasta alla bolognese',20,30,3,1690063411191,16,4,79,NULL,'easy');
INSERT INTO recipes VALUES(8,'Imperial chicken',30,15,3,1690063462383,15,4,78,NULL,'medium');
INSERT INTO recipes VALUES(9,'Salad with chicken and mozarella',10,10,3,1690063531458,13,4,77,NULL,'easy');
INSERT INTO recipes VALUES(10,'Chili con carne',15,45,4,1690063566968,12,4,76,NULL,'easy');
INSERT INTO recipes VALUES(11,'Cantonese rice',30,55,4,1690063721500,11,6,74,NULL,'easy');
INSERT INTO recipes VALUES(12,'Chicken Teriyaki',10,20,4,1690063759866,10,4,73,NULL,'easy');
INSERT INTO recipes VALUES(13,'Chicken basquaise',10,40,4,1690063814131,14,4,71,NULL,'medium');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('profiles',4);
INSERT INTO sqlite_sequence VALUES('unit_measures',11);
INSERT INTO sqlite_sequence VALUES('categories',11);
INSERT INTO sqlite_sequence VALUES('icons',71);
INSERT INTO sqlite_sequence VALUES('difficulties',3);
INSERT INTO sqlite_sequence VALUES('genders',2);
INSERT INTO sqlite_sequence VALUES('images',18);
INSERT INTO sqlite_sequence VALUES('instructions',145);
INSERT INTO sqlite_sequence VALUES('macros',81);
INSERT INTO sqlite_sequence VALUES('ingredients',69);
INSERT INTO sqlite_sequence VALUES('tags',107);
INSERT INTO sqlite_sequence VALUES('recipes',13);
CREATE UNIQUE INDEX "genders_gender_key" ON "genders"("gender");
CREATE UNIQUE INDEX "images_imageKey_key" ON "images"("imageKey");
CREATE UNIQUE INDEX "difficulties_name_key" ON "difficulties"("name");
CREATE UNIQUE INDEX "icons_name_key" ON "icons"("name");
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "activity_levels_activity_level_key" ON "activity_levels"("activity_level");
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");
CREATE UNIQUE INDEX "unit_measures_name_key" ON "unit_measures"("name");
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
CREATE UNIQUE INDEX "macros_food_key" ON "macros"("food");
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");
CREATE UNIQUE INDEX "reviews_author_id_recipe_id_key" ON "reviews"("author_id", "recipe_id");
CREATE UNIQUE INDEX "shopping_lists_meal_plan_id_key" ON "shopping_lists"("meal_plan_id");
CREATE UNIQUE INDEX "recipes_name_key" ON "recipes"("name");
CREATE UNIQUE INDEX "recipes_macros_id_key" ON "recipes"("macros_id");
COMMIT;
