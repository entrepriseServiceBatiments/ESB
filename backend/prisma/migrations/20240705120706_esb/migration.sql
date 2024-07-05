/*
  Warnings:

  - The primary key for the `message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `conversationId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `recipientId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `ordersId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `conversation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workerId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_conversationId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_recipientId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_ordersId_fkey`;

-- AlterTable
ALTER TABLE `message` DROP PRIMARY KEY,
    DROP COLUMN `conversationId`,
    DROP COLUMN `id`,
    DROP COLUMN `recipientId`,
    DROP COLUMN `senderId`,
    ADD COLUMN `clientId` INTEGER NOT NULL,
    ADD COLUMN `workerId` INTEGER NOT NULL,
    MODIFY `content` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`clientId`, `workerId`);

-- AlterTable
ALTER TABLE `product` DROP COLUMN `ordersId`;

-- DropTable
DROP TABLE `conversation`;

-- CreateTable
CREATE TABLE `OrderProduct` (
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`orderId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`idorders`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`idproducts`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `Worker`(`idworker`) ON DELETE RESTRICT ON UPDATE CASCADE;
