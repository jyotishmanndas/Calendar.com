/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[availabilityId,days]` on the table `dayAvailability` will be added. If there are existing duplicate values, this will fail.
  - Made the column `availabilityId` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Event" ALTER COLUMN "availabilityId" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."Bookings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fromTime" TIMESTAMP(3) NOT NULL,
    "tillTime" TIMESTAMP(3) NOT NULL,
    "mettingLink" TEXT NOT NULL,
    "googleEventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_url_key" ON "public"."Event"("url");

-- CreateIndex
CREATE UNIQUE INDEX "dayAvailability_availabilityId_days_key" ON "public"."dayAvailability"("availabilityId", "days");

-- AddForeignKey
ALTER TABLE "public"."Bookings" ADD CONSTRAINT "Bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bookings" ADD CONSTRAINT "Bookings_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
