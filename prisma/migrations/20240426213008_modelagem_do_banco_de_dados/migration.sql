/*
  Warnings:

  - You are about to drop the column `data` on the `eventos` table. All the data in the column will be lost.
  - Added the required column `data_fim` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_inicio` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "data",
ADD COLUMN     "data_fim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_inicio" TIMESTAMP(3) NOT NULL;
