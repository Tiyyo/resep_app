/*
  Warnings:

  - You are about to drop the column `name` on the `list_items` table. All the data in the column will be lost.
  - You are about to drop the column `shopping_list_id` on the `list_items` table. All the data in the column will be lost.
  - You are about to drop the `meals_on_recipes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredient_id` to the `list_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "list_items" DROP CONSTRAINT "list_items_name_fkey";

-- DropForeignKey
ALTER TABLE "list_items" DROP CONSTRAINT "list_items_shopping_list_id_fkey";

-- DropForeignKey
ALTER TABLE "meals_on_recipes" DROP CONSTRAINT "meals_on_recipes_meal_plans_id_fkey";

-- DropForeignKey
ALTER TABLE "meals_on_recipes" DROP CONSTRAINT "meals_on_recipes_recipe_id_fkey";

-- AlterTable
ALTER TABLE "list_items" DROP COLUMN "name",
DROP COLUMN "shopping_list_id",
ADD COLUMN     "ingredient_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "meals_on_recipes";

-- CreateTable
CREATE TABLE "meals" (
    "id" SERIAL NOT NULL,
    "recipe_name" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "image" TEXT,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meals_on_meal_plans" (
    "meals_id" INTEGER NOT NULL,
    "meal_plans_id" INTEGER NOT NULL,

    CONSTRAINT "meals_on_meal_plans_pkey" PRIMARY KEY ("meals_id","meal_plans_id")
);

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals_on_meal_plans" ADD CONSTRAINT "meals_on_meal_plans_meals_id_fkey" FOREIGN KEY ("meals_id") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals_on_meal_plans" ADD CONSTRAINT "meals_on_meal_plans_meal_plans_id_fkey" FOREIGN KEY ("meal_plans_id") REFERENCES "meal_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
