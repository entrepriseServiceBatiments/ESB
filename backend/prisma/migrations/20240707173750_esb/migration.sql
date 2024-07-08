/*
  Warnings:

  - The primary key for the `message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `conversationId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_workerId_fkey`;

-- AlterTable
ALTER TABLE `message` DROP PRIMARY KEY,
    ADD COLUMN `conversationId` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `clientId` INTEGER NULL,
    MODIFY `workerId` INTEGER NULL,
    MODIFY `content` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Conversation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `idx_conversationId` ON `Message`(`conversationId`);

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`idClient`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `Worker`(`idworker`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
