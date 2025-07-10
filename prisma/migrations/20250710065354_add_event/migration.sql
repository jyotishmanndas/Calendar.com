-- CreateEnum
CREATE TYPE "videoCall" AS ENUM ('GoogleMeet', 'Zoom', 'Teams');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "videoCallProvider" "videoCall" NOT NULL DEFAULT 'GoogleMeet',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
