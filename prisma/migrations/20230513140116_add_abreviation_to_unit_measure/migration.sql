/*
  Warnings:

  - Added the required column `abreviation` to the `Unit_computes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Unit_computes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "abreviation" TEXT NOT NULL
);
INSERT INTO "new_Unit_computes" ("id", "name") SELECT "id", "name" FROM "Unit_computes";
DROP TABLE "Unit_computes";
ALTER TABLE "new_Unit_computes" RENAME TO "Unit_computes";
CREATE UNIQUE INDEX "Unit_computes_name_key" ON "Unit_computes"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
