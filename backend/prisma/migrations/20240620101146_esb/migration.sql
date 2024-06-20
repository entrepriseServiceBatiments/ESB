-- DropForeignKey
ALTER TABLE `worker` DROP FOREIGN KEY `Worker_ordersId_fkey`;

-- AlterTable
ALTER TABLE `worker` MODIFY `ordersId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Worker` ADD CONSTRAINT `Worker_ordersId_fkey` FOREIGN KEY (`ordersId`) REFERENCES `Order`(`idorders`) ON DELETE SET NULL ON UPDATE CASCADE;
