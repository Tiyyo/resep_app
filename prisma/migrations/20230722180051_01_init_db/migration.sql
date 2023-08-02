/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Password` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Note";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Password";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "genders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gender" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageKey" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "width" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "instructions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "difficulties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "icons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image_key" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tags_on_icons" (
    "icon_id" INTEGER NOT NULL,
    "tag_name" TEXT NOT NULL,

    PRIMARY KEY ("icon_id", "tag_name"),
    CONSTRAINT "tags_on_icons_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "icons" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "tags_on_icons_tag_name_fkey" FOREIGN KEY ("tag_name") REFERENCES "tags" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);

-- CreateTable
CREATE TABLE "activity_levels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activity_level" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "factor" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "profiles" (
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

-- CreateTable
CREATE TABLE "unit_measures" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "abreviation" TEXT NOT NULL,
    "equivalent" DECIMAL,
    "unit" TEXT NOT NULL DEFAULT 'grams'
);

-- CreateTable
CREATE TABLE "categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "macros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "food" TEXT,
    "calories" DECIMAL NOT NULL,
    "proteins" DECIMAL NOT NULL,
    "carbs" DECIMAL NOT NULL,
    "fat" DECIMAL NOT NULL,
    "water" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "ingredients" (
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

-- CreateTable
CREATE TABLE "ingredients_on_recipes" (
    "qty" DECIMAL NOT NULL,
    "unit_measure_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    PRIMARY KEY ("ingredient_id", "recipe_id"),
    CONSTRAINT "ingredients_on_recipes_unit_measure_id_fkey" FOREIGN KEY ("unit_measure_id") REFERENCES "unit_measures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ingredients_on_recipes_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ingredients_on_recipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "instructions_on_recipes" (
    "instruction_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    PRIMARY KEY ("recipe_id", "instruction_id"),
    CONSTRAINT "instructions_on_recipes_instruction_id_fkey" FOREIGN KEY ("instruction_id") REFERENCES "instructions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "instructions_on_recipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "reviews" (
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

-- CreateTable
CREATE TABLE "recipes_on_tags" (
    "tag_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    PRIMARY KEY ("tag_id", "recipe_id"),
    CONSTRAINT "recipes_on_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "recipes_on_tags_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "recipes" (
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

-- CreateTable
CREATE TABLE "meals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipe_name" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "image" TEXT,
    CONSTRAINT "meals_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "meal_plans" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "meal_plans_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "meals_on_meal_plans" (
    "meals_id" INTEGER NOT NULL,
    "meal_plans_id" INTEGER NOT NULL,

    PRIMARY KEY ("meals_id", "meal_plans_id"),
    CONSTRAINT "meals_on_meal_plans_meals_id_fkey" FOREIGN KEY ("meals_id") REFERENCES "meals" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "meals_on_meal_plans_meal_plans_id_fkey" FOREIGN KEY ("meal_plans_id") REFERENCES "meal_plans" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "list_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ingredient_id" INTEGER NOT NULL,
    "qty" DECIMAL NOT NULL,
    "unit_measure_id" INTEGER NOT NULL,
    CONSTRAINT "list_items_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "list_items_unit_measure_id_fkey" FOREIGN KEY ("unit_measure_id") REFERENCES "unit_measures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "shoppin_lists_on_list_items" (
    "list_item_id" INTEGER NOT NULL,
    "shopping_list_id" INTEGER NOT NULL,

    PRIMARY KEY ("list_item_id", "shopping_list_id"),
    CONSTRAINT "shoppin_lists_on_list_items_list_item_id_fkey" FOREIGN KEY ("list_item_id") REFERENCES "list_items" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "shoppin_lists_on_list_items_shopping_list_id_fkey" FOREIGN KEY ("shopping_list_id") REFERENCES "shopping_lists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "shopping_lists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "meal_plan_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "shopping_lists_meal_plan_id_fkey" FOREIGN KEY ("meal_plan_id") REFERENCES "meal_plans" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "genders_gender_key" ON "genders"("gender");

-- CreateIndex
CREATE UNIQUE INDEX "images_imageKey_key" ON "images"("imageKey");

-- CreateIndex
CREATE UNIQUE INDEX "difficulties_name_key" ON "difficulties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "icons_name_key" ON "icons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "activity_levels_activity_level_key" ON "activity_levels"("activity_level");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "unit_measures_name_key" ON "unit_measures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "macros_food_key" ON "macros"("food");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_author_id_recipe_id_key" ON "reviews"("author_id", "recipe_id");

-- CreateIndex
CREATE UNIQUE INDEX "recipes_name_key" ON "recipes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "recipes_macros_id_key" ON "recipes"("macros_id");

-- CreateIndex
CREATE UNIQUE INDEX "shopping_lists_meal_plan_id_key" ON "shopping_lists"("meal_plan_id");
