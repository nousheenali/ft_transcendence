-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "channelPassword" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "TFAVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "refreshToken" TEXT;
