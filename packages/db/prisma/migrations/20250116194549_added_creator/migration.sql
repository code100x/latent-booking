/*
  Warnings:

  - Added the required column `type` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdminType" AS ENUM ('SuperAdmin', 'Creator');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "type" "AdminType" NOT NULL;
