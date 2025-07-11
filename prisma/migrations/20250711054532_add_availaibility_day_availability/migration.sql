-- CreateEnum
CREATE TYPE "WeekDays" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT;

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dayAvailability" (
    "id" TEXT NOT NULL,
    "days" "WeekDays" NOT NULL,
    "fromTime" TEXT NOT NULL,
    "tillTime" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "availabilityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dayAvailability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dayAvailability" ADD CONSTRAINT "dayAvailability_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE CASCADE ON UPDATE CASCADE;
