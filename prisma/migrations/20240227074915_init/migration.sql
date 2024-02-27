/*
  Warnings:

  - You are about to drop the column `completed` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `todo` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `ToDo_username_fkey`;

-- DropIndex
DROP INDEX `User_name_key` ON `user`;

-- AlterTable
ALTER TABLE `todo` DROP COLUMN `completed`,
    DROP COLUMN `username`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `lastLogin`,
    DROP COLUMN `name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
