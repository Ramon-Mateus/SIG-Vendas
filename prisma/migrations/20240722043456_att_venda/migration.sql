/*
  Warnings:

  - Added the required column `desconto` to the `Vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forma_pagamento` to the `Vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frete` to the `Vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prazo_adicional` to the `Vendas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vendas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "frete" REAL NOT NULL,
    "desconto" REAL NOT NULL,
    "prazo_adicional" INTEGER NOT NULL,
    "forma_pagamento" INTEGER NOT NULL
);
INSERT INTO "new_Vendas" ("id", "status", "total") SELECT "id", "status", "total" FROM "Vendas";
DROP TABLE "Vendas";
ALTER TABLE "new_Vendas" RENAME TO "Vendas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
