-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_ordersId_fkey`;

-- AlterTable
ALTER TABLE `product` MODIFY `ordersId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_ordersId_fkey` FOREIGN KEY (`ordersId`) REFERENCES `Order`(`idorders`) ON DELETE SET NULL ON UPDATE CASCADE;
