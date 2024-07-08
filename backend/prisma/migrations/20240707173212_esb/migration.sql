-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `idClient` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `creditCard` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `cin` INTEGER NOT NULL,
    `phoneNum` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NULL,

    UNIQUE INDEX `Client_cin_key`(`cin`),
    UNIQUE INDEX `Client_phoneNum_key`(`phoneNum`),
    UNIQUE INDEX `Client_email_key`(`email`),
    PRIMARY KEY (`idClient`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `idorders` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` VARCHAR(191) NULL,
    `endDate` VARCHAR(191) NULL,
    `clientId` INTEGER NOT NULL,

    PRIMARY KEY (`idorders`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `idproducts` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `numOfRatings` INTEGER NOT NULL,

    PRIMARY KEY (`idproducts`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderProduct` (
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`orderId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite` (
    `clientId` INTEGER NOT NULL,
    `productsId` INTEGER NOT NULL,

    PRIMARY KEY (`clientId`, `productsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Worker` (
    `idworker` INTEGER NOT NULL AUTO_INCREMENT,
    `cin` INTEGER NOT NULL,
    `creditCard` VARCHAR(191) NULL,
    `userName` VARCHAR(191) NOT NULL,
    `phoneNum` INTEGER NOT NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `rentedProd` VARCHAR(191) NULL,
    `picture` VARCHAR(191) NULL,
    `resume` VARCHAR(191) NULL,
    `rating` INTEGER NULL,
    `jobTitle` VARCHAR(191) NULL,
    `hourlyRate` DOUBLE NULL,
    `available` BOOLEAN NULL,
    `address` VARCHAR(191) NULL,
    `ordersId` INTEGER NULL,
    `latitude` DECIMAL(65, 30) NULL,
    `longitude` DECIMAL(65, 30) NULL,
    `status` BOOLEAN NULL,
    `comments` VARCHAR(191) NULL,

    UNIQUE INDEX `Worker_email_key`(`email`),
    INDEX `idx_ordersId`(`ordersId`),
    PRIMARY KEY (`idworker`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `clientId` INTEGER NOT NULL,
    `workerId` INTEGER NOT NULL,
    `content` VARCHAR(191) NULL,

    PRIMARY KEY (`clientId`, `workerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`idorders`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`idproducts`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Product`(`idproducts`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Worker` ADD CONSTRAINT `Worker_ordersId_fkey` FOREIGN KEY (`ordersId`) REFERENCES `Order`(`idorders`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `Worker`(`idworker`) ON DELETE RESTRICT ON UPDATE CASCADE;
