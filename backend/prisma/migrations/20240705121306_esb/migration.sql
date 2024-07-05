/*
  Warnings:

  - You are about to drop the column `ordersId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `worker` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cin]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNum]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNum` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_ordersId_fkey`;

-- AlterTable
ALTER TABLE `client` MODIFY `creditCard` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `ordersId`;

-- AlterTable
ALTER TABLE `worker` DROP COLUMN `phoneNumber`,
    ADD COLUMN `phoneNum` INTEGER NOT NULL,
    MODIFY `creditCard` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `OrderProduct` (
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`orderId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Client_cin_key` ON `Client`(`cin`);

-- CreateIndex
CREATE UNIQUE INDEX `Client_phoneNum_key` ON `Client`(`phoneNum`);

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`idorders`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`idproducts`) ON DELETE RESTRICT ON UPDATE CASCADE;
