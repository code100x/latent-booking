/*
  Warnings:

  - Added the required column `sequenceNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "sequenceNumber" INTEGER NOT NULL;
