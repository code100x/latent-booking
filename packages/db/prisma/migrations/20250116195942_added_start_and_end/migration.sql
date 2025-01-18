-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "ended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;
