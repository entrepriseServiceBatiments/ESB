/*
  Warnings:

  - Added the required column `amount` to the `PendingOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pendingorder` ADD COLUMN `amount` INTEGER NOT NULL;
