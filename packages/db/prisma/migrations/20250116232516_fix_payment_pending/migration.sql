-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'PendingPayment';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "paymentId" TEXT;
