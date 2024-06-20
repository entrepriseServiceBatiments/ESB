/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Worker` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ordersId` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ordersId` on table `worker` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_ordersId_fkey`;

-- DropForeignKey
ALTER TABLE `worker` DROP FOREIGN KEY `Worker_ordersId_fkey`;

-- AlterTable
ALTER TABLE `product` MODIFY `ordersId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `worker` MODIFY `ordersId` INTEGER NOT NULL,
    MODIFY `latitude` DECIMAL(65, 30) NULL,
    MODIFY `longitude` DECIMAL(65, 30) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Client_email_key` ON `Client`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Worker_email_key` ON `Worker`(`email`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_ordersId_fkey` FOREIGN KEY (`ordersId`) REFERENCES `Order`(`idorders`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Worker` ADD CONSTRAINT `Worker_ordersId_fkey` FOREIGN KEY (`ordersId`) REFERENCES `Order`(`idorders`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `worker` RENAME INDEX `Worker_ordersId_fkey` TO `idx_ordersId`;
