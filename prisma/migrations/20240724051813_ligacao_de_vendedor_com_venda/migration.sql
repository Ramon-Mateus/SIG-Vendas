/*
  Warnings:

  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Vendas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_Users" ("email", "id", "password", "role") SELECT "email", "id", "password", "role" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
CREATE TABLE "new_Vendas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "frete" REAL NOT NULL,
    "desconto" REAL NOT NULL,
    "prazo_adicional" INTEGER NOT NULL,
    "forma_pagamento" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Vendas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vendas" ("desconto", "endereco", "forma_pagamento", "frete", "id", "prazo_adicional", "status", "total") SELECT "desconto", "endereco", "forma_pagamento", "frete", "id", "prazo_adicional", "status", "total" FROM "Vendas";
DROP TABLE "Vendas";
ALTER TABLE "new_Vendas" RENAME TO "Vendas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
