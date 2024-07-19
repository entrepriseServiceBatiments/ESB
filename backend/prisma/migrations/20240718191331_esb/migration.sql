-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` INTEGER NOT NULL,
    `pendingOrderId` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',

    INDEX `idx_clientId`(`clientId`),
    INDEX `idx_pendingOrderId`(`pendingOrderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_pendingOrderId_fkey` FOREIGN KEY (`pendingOrderId`) REFERENCES `PendingOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
