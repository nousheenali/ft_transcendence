/*
  Warnings:

  - You are about to drop the column `TFAVerificationRequired` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "TFAVerificationRequired",
ADD COLUMN     "TFAVerified" BOOLEAN NOT NULL DEFAULT false;
