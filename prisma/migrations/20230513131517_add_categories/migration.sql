/*
  Warnings:

  - Added the required column `categoryId` to the `Ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Ingredient_categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "unit_weight" DECIMAL,
    "categoryId" INTEGER NOT NULL,
    "unit_measureId" INTEGER NOT NULL,
    "unit_computeId" INTEGER NOT NULL,
    "macrosId" INTEGER,
    "iconId" INTEGER,
    CONSTRAINT "Ingredients_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Ingredient_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ingredients_unit_measureId_fkey" FOREIGN KEY ("unit_measureId") REFERENCES "Unit_measures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ingredients_unit_computeId_fkey" FOREIGN KEY ("unit_computeId") REFERENCES "Unit_computes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ingredients_macrosId_fkey" FOREIGN KEY ("macrosId") REFERENCES "Macros" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ingredients_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icons" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ingredients" ("iconId", "id", "macrosId", "name", "unit_computeId", "unit_measureId", "unit_weight") SELECT "iconId", "id", "macrosId", "name", "unit_computeId", "unit_measureId", "unit_weight" FROM "Ingredients";
DROP TABLE "Ingredients";
ALTER TABLE "new_Ingredients" RENAME TO "Ingredients";
CREATE UNIQUE INDEX "Ingredients_name_key" ON "Ingredients"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_categories_category_name_key" ON "Ingredient_categories"("category_name");
