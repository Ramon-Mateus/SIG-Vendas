-- CreateTable
CREATE TABLE "Produtos" (
    "SKU" TEXT NOT NULL PRIMARY KEY,
    "produto" TEXT NOT NULL,
    "preco_cheio" REAL NOT NULL,
    "preco_descontado" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Itens_Venda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "venda_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Vendas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" INTEGER NOT NULL
);
