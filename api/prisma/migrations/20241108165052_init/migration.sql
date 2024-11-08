/*
  Warnings:

  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('SOLAR_ECLIPSE', 'LUNAR_ECLIPSE', 'METEOR_SHOWER', 'ASTEROID', 'COMET');

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_userId_fkey";

-- DropTable
DROP TABLE "Action";

-- DropEnum
DROP TYPE "ActionType";

-- CreateTable
CREATE TABLE "Event" (
    "description" TEXT NOT NULL,
    "id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "isSpotted" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID,
    "type" "EventType" NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
