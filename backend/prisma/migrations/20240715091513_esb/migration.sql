/*
  Warnings:

  - Added the required column `sender` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `conversation` ADD COLUMN `clientId` INTEGER NULL,
    ADD COLUMN `workerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `message` ADD COLUMN `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `sender` VARCHAR(191) NOT NULL;
