/*
  Warnings:

  - You are about to alter the column `imgDocument` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Added the required column `acount` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agency` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `acount` VARCHAR(191) NOT NULL,
    ADD COLUMN `agency` VARCHAR(191) NOT NULL,
    MODIFY `imgDocument` JSON NOT NULL;
