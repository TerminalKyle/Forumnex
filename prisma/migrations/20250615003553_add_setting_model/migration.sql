-- CreateTable
CREATE TABLE `Setting` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `forumName` VARCHAR(191) NULL,
    `forumUrl` VARCHAR(191) NULL,
    `logoUrl` VARCHAR(191) NULL,
    `theme` VARCHAR(191) NULL,
    `setupDone` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
