/*
  Warnings:

  - You are about to drop the column `userRole` on the `Users` table. All the data in the column will be lost.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Profiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "avatar" TEXT,
    "age" DATETIME NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" DECIMAL NOT NULL,
    "genderId" INTEGER NOT NULL,
    "activity_levelId" INTEGER NOT NULL,
    CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Profiles_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Genders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Profiles_activity_levelId_fkey" FOREIGN KEY ("activity_levelId") REFERENCES "Activity_levels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Genders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gender" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Activity_levels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activity_level" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Recipes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "prep_time" INTEGER NOT NULL,
    "cook_time" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "picture" TEXT,
    "servings" INTEGER NOT NULL,
    "macro_recipeId" INTEGER NOT NULL,
    "favoriteId" INTEGER NOT NULL,
    CONSTRAINT "Recipes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Recipes_macro_recipeId_fkey" FOREIGN KEY ("macro_recipeId") REFERENCES "Macros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Recipes_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorites" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "unit_weight" DECIMAL,
    "unit_measureId" INTEGER NOT NULL,
    "unit_computeId" INTEGER NOT NULL,
    "macrosId" INTEGER,
    "iconId" INTEGER,
    CONSTRAINT "Ingredients_unit_measureId_fkey" FOREIGN KEY ("unit_measureId") REFERENCES "Unit_measures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ingredients_unit_computeId_fkey" FOREIGN KEY ("unit_computeId") REFERENCES "Unit_computes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ingredients_macrosId_fkey" FOREIGN KEY ("macrosId") REFERENCES "Macros" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ingredients_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icons" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Unit_measures" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Unit_computes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Icons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_tag" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Macros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nutrient" TEXT,
    "calories" DECIMAL NOT NULL,
    "proteins" DECIMAL NOT NULL,
    "carbs" DECIMAL NOT NULL,
    "lipids" DECIMAL NOT NULL,
    "water" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" INTEGER NOT NULL,
    CONSTRAINT "Favorites_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IngredientsOnRecipes" (
    "qty" DECIMAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    PRIMARY KEY ("ingredientId", "recipeId"),
    CONSTRAINT "IngredientsOnRecipes_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IngredientsOnRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReviewsOnRecipes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reviewId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    CONSTRAINT "ReviewsOnRecipes_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Reviews" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReviewsOnRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RecipesOnTags" (
    "tagId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    PRIMARY KEY ("tagId", "recipeId"),
    CONSTRAINT "RecipesOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RecipesOnTags_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    CONSTRAINT "Users_role_fkey" FOREIGN KEY ("role") REFERENCES "Roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("id") SELECT "id" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_userId_key" ON "Profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Genders_gender_key" ON "Genders"("gender");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_levels_activity_level_key" ON "Activity_levels"("activity_level");

-- CreateIndex
CREATE UNIQUE INDEX "Recipes_name_key" ON "Recipes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipes_macro_recipeId_key" ON "Recipes"("macro_recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredients_name_key" ON "Ingredients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_measures_name_key" ON "Unit_measures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_computes_name_key" ON "Unit_computes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Icons_name_key" ON "Icons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_tag_key" ON "Tags"("name_tag");

-- CreateIndex
CREATE UNIQUE INDEX "Macros_nutrient_key" ON "Macros"("nutrient");
