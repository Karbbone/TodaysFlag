-- CreateTable
CREATE TABLE `Country` (
    `CC` VARCHAR(191) NOT NULL,
    `NameENG` VARCHAR(191) NOT NULL,
    `NameFRA` VARCHAR(191) NOT NULL,
    `NameESP` VARCHAR(191) NOT NULL,
    `Flag` VARCHAR(191) NOT NULL,
    `Capital` VARCHAR(191) NULL,
    `Map` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CC`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GuessedCountry` (
    `guessedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `countryCC` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GuessedCountry_countryCC_key`(`countryCC`),
    PRIMARY KEY (`guessedAt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GuessedCountry` ADD CONSTRAINT `GuessedCountry_countryCC_fkey` FOREIGN KEY (`countryCC`) REFERENCES `Country`(`CC`) ON DELETE RESTRICT ON UPDATE CASCADE;
