-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Itens_Venda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "venda_id" INTEGER NOT NULL,
    "produto_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    CONSTRAINT "Itens_Venda_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "Vendas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Itens_Venda_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produtos" ("SKU") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Itens_Venda" ("id", "produto_id", "quantidade", "venda_id") SELECT "id", "produto_id", "quantidade", "venda_id" FROM "Itens_Venda";
DROP TABLE "Itens_Venda";
ALTER TABLE "new_Itens_Venda" RENAME TO "Itens_Venda";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
