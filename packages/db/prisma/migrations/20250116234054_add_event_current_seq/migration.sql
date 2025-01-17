/*
  Warnings:

  - Added the required column `currentSequenceNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'Filled';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "currentSequenceNumber" INTEGER NOT NULL;
