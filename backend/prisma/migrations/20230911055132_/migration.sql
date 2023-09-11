/*
  Warnings:

  - Made the column `channelId` on table `ChannelRelation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ChannelRelation" DROP CONSTRAINT "ChannelRelation_channelId_fkey";

-- AlterTable
ALTER TABLE "ChannelRelation" ALTER COLUMN "channelId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ChannelRelation" ADD CONSTRAINT "ChannelRelation_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
