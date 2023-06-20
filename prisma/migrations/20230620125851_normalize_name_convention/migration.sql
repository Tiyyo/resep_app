/*
  Warnings:

  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Unit_computes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `category_name` on the `Ingredient_categories` table. All the data in the column will be lost.
  - You are about to drop the column `lipids` on the `Macros` table. All the data in the column will be lost.
  - You are about to drop the column `nutrient` on the `Macros` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `ReviewsOnRecipes` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `ReviewsOnRecipes` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `iconId` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `macrosId` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `unit_computeId` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `unit_measureId` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `name_tag` on the `Tags` table. All the data in the column will be lost.
  - The primary key for the `RecipesOnTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recipeId` on the `RecipesOnTags` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `RecipesOnTags` table. All the data in the column will be lost.
  - You are about to drop the column `activity_levelId` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `genderId` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Profiles` table. All the data in the column will be lost.
  - The primary key for the `IngredientsOnRecipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ingredientId` on the `IngredientsOnRecipes` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `IngredientsOnRecipes` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteId` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `macro_recipeId` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Users` table. All the data in the column will be lost.
  - Added the required column `name` to the `Ingredient_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factor` to the `Activity_levels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `Macros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `ReviewsOnRecipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review_id` to the `ReviewsOnRecipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_key` to the `Icons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `Favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `RecipesOnTags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_id` to the `RecipesOnTags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredient_id` to the `IngredientsOnRecipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `IngredientsOnRecipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_measure_id` to the `IngredientsOnRecipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `abreviation` to the `Unit_measures` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Roles_Roles_key";

-- DropIndex
DROP INDEX "Unit_computes_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Roles";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Unit_computes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageKey" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "width" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "Instructions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InstructionOnRecipes" (
    "instruction_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    PRIMARY KEY ("recipe_id", "instruction_id"),
    CONSTRAINT "InstructionOnRecipes_instruction_id_fkey" FOREIGN KEY ("instruction_id") REFERENCES "Instructions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "InstructionOnRecipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Difficulties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TagsOnIcons" (
    "icon_id" INTEGER NOT NULL,
    "tag_name" TEXT NOT NULL,

    PRIMARY KEY ("icon_id", "tag_name"),
    CONSTRAINT "TagsOnIcons_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "Icons" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TagsOnIcons_tag_name_fkey" FOREIGN KEY ("tag_name") REFERENCES "Tags" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingredient_categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Ingredient_categories" ("id") SELECT "id" FROM "Ingredient_categories";
DROP TABLE "Ingredient_categories";
ALTER TABLE "new_Ingredient_categories" RENAME TO "Ingredient_categories";
CREATE UNIQUE INDEX "Ingredient_categories_name_key" ON "Ingredient_categories"("name");
CREATE TABLE "new_Activity_levels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activity_level" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "factor" DECIMAL NOT NULL
);
INSERT INTO "new_Activity_levels" ("activity_level", "description", "id") SELECT "activity_level", "description", "id" FROM "Activity_levels";
DROP TABLE "Activity_levels";
ALTER TABLE "new_Activity_levels" RENAME TO "Activity_levels";
CREATE UNIQUE INDEX "Activity_levels_activity_level_key" ON "Activity_levels"("activity_level");
CREATE TABLE "new_Macros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "food" TEXT,
    "calories" DECIMAL NOT NULL,
    "proteins" DECIMAL NOT NULL,
    "carbs" DECIMAL NOT NULL,
    "fat" DECIMAL NOT NULL,
    "water" DECIMAL NOT NULL
);
INSERT INTO "new_Macros" ("calories", "carbs", "id", "proteins", "water") SELECT "calories", "carbs", "id", "proteins", "water" FROM "Macros";
DROP TABLE "Macros";
ALTER TABLE "new_Macros" RENAME TO "Macros";
CREATE UNIQUE INDEX "Macros_food_key" ON "Macros"("food");
CREATE TABLE "new_Reviews" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Reviews_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reviews" ("comment", "created_at", "id", "rating", "updated_at") SELECT "comment", "created_at", "id", "rating", "updated_at" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
CREATE TABLE "new_ReviewsOnRecipes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "review_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    CONSTRAINT "ReviewsOnRecipes_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Reviews" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReviewsOnRecipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReviewsOnRecipes" ("id") SELECT "id" FROM "ReviewsOnRecipes";
DROP TABLE "ReviewsOnRecipes";
ALTER TABLE "new_ReviewsOnRecipes" RENAME TO "ReviewsOnRecipes";
CREATE TABLE "new_Icons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image_key" TEXT NOT NULL
);
INSERT INTO "new_Icons" ("id", "link", "name") SELECT "id", "link", "name" FROM "Icons";
DROP TABLE "Icons";
ALTER TABLE "new_Icons" RENAME TO "Icons";
CREATE UNIQUE INDEX "Icons_name_key" ON "Icons"("name");
CREATE TABLE "new_Favorites" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profile_id" INTEGER NOT NULL,
    CONSTRAINT "Favorites_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Favorites" ("id") SELECT "id" FROM "Favorites";
DROP TABLE "Favorites";
ALTER TABLE "new_Favorites" RENAME TO "Favorites";
CREATE TABLE "new_Ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "unit_weight" DECIMAL,
    "category_id" INTEGER NOT NULL,
    "macros_id" INTEGER,
    "icon_id" INTEGER,
    CONSTRAINT "Ingredients_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Ingredient_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ingredients_macros_id_fkey" FOREIGN KEY ("macros_id") REFERENCES "Macros" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ingredients_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "Icons" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ingredients" ("id", "name", "unit_weight") SELECT "id", "name", "unit_weight" FROM "Ingredients";
DROP TABLE "Ingredients";
ALTER TABLE "new_Ingredients" RENAME TO "Ingredients";
CREATE UNIQUE INDEX "Ingredients_name_key" ON "Ingredients"("name");
CREATE TABLE "new_Tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Tags" ("id") SELECT "id" FROM "Tags";
DROP TABLE "Tags";
ALTER TABLE "new_Tags" RENAME TO "Tags";
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");
CREATE TABLE "new_RecipesOnTags" (
    "tag_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    PRIMARY KEY ("tag_id", "recipe_id"),
    CONSTRAINT "RecipesOnTags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RecipesOnTags_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE "RecipesOnTags";
ALTER TABLE "new_RecipesOnTags" RENAME TO "RecipesOnTags";
CREATE TABLE "new_Profiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "username" TEXT,
    "avatar" TEXT,
    "age" DATETIME,
    "height" INTEGER,
    "weight" DECIMAL,
    "gender_id" INTEGER,
    "activity_level_id" INTEGER,
    CONSTRAINT "Profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Profiles_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "Genders" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Profiles_activity_level_id_fkey" FOREIGN KEY ("activity_level_id") REFERENCES "Activity_levels" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Profiles" ("age", "avatar", "height", "id", "weight") SELECT "age", "avatar", "height", "id", "weight" FROM "Profiles";
DROP TABLE "Profiles";
ALTER TABLE "new_Profiles" RENAME TO "Profiles";
CREATE UNIQUE INDEX "Profiles_user_id_key" ON "Profiles"("user_id");
CREATE TABLE "new_IngredientsOnRecipes" (
    "qty" DECIMAL NOT NULL,
    "unit_measure_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    PRIMARY KEY ("ingredient_id", "recipe_id"),
    CONSTRAINT "IngredientsOnRecipes_unit_measure_id_fkey" FOREIGN KEY ("unit_measure_id") REFERENCES "Unit_measures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IngredientsOnRecipes_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "IngredientsOnRecipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_IngredientsOnRecipes" ("qty") SELECT "qty" FROM "IngredientsOnRecipes";
DROP TABLE "IngredientsOnRecipes";
ALTER TABLE "new_IngredientsOnRecipes" RENAME TO "IngredientsOnRecipes";
CREATE TABLE "new_Recipes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "prep_time" INTEGER NOT NULL,
    "cook_time" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image_id" INTEGER,
    "servings" INTEGER NOT NULL,
    "macro_recipe_id" INTEGER,
    "favorite_id" INTEGER,
    "youtube_link" TEXT,
    "level" TEXT NOT NULL,
    CONSTRAINT "Recipes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Profiles" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
    CONSTRAINT "Recipes_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Images" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Recipes_macro_recipe_id_fkey" FOREIGN KEY ("macro_recipe_id") REFERENCES "Macros" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Recipes_favorite_id_fkey" FOREIGN KEY ("favorite_id") REFERENCES "Favorites" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Recipes_level_fkey" FOREIGN KEY ("level") REFERENCES "Difficulties" ("name") ON DELETE SET DEFAULT ON UPDATE CASCADE
);
INSERT INTO "new_Recipes" ("cook_time", "created_at", "id", "name", "prep_time", "servings") SELECT "cook_time", "created_at", "id", "name", "prep_time", "servings" FROM "Recipes";
DROP TABLE "Recipes";
ALTER TABLE "new_Recipes" RENAME TO "Recipes";
CREATE UNIQUE INDEX "Recipes_name_key" ON "Recipes"("name");
CREATE UNIQUE INDEX "Recipes_macro_recipe_id_key" ON "Recipes"("macro_recipe_id");
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Users" ("email", "id", "password") SELECT "email", "id", "password" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
CREATE TABLE "new_Unit_measures" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "abreviation" TEXT NOT NULL,
    "equivalent" DECIMAL,
    "unit" TEXT NOT NULL DEFAULT 'grams'
);
INSERT INTO "new_Unit_measures" ("id", "name") SELECT "id", "name" FROM "Unit_measures";
DROP TABLE "Unit_measures";
ALTER TABLE "new_Unit_measures" RENAME TO "Unit_measures";
CREATE UNIQUE INDEX "Unit_measures_name_key" ON "Unit_measures"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Images_imageKey_key" ON "Images"("imageKey");

-- CreateIndex
CREATE UNIQUE INDEX "Difficulties_name_key" ON "Difficulties"("name");
