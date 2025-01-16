/*
  Warnings:

  - You are about to drop the column `startTime` on the `Admin` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "startTime";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
