-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "timeoutInS" INTEGER NOT NULL DEFAULT 600;

-- AlterTable
ALTER TABLE "SeatType" ADD COLUMN     "locked" INTEGER NOT NULL DEFAULT 0;