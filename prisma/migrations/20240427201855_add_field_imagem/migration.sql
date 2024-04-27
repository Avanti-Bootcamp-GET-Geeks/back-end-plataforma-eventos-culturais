/*
  Warnings:

  - Added the required column `imagem` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eventos" ADD COLUMN     "imagem" TEXT NOT NULL;
