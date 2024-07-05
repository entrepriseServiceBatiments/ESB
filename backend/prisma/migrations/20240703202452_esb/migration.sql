/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `worker` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cin]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNum]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNum` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `worker` DROP COLUMN `phoneNumber`,
    ADD COLUMN `phoneNum` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Client_cin_key` ON `Client`(`cin`);

-- CreateIndex
CREATE UNIQUE INDEX `Client_phoneNum_key` ON `Client`(`phoneNum`);
