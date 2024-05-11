/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `cargos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cargos_nome_key" ON "cargos"("nome");
