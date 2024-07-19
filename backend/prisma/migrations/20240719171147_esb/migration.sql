/*
  Warnings:

  - You are about to alter the column `latitude` on the `client` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `longitude` on the `client` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `client` MODIFY `latitude` DOUBLE NULL,
    MODIFY `longitude` DOUBLE NULL;
