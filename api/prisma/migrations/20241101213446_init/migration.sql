-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('SOLAR_ECLIPSE', 'LUNAR_ECLIPSE', 'METEOR_SHOWER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "password" TEXT NOT NULL,
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '',
    "isHaveAvatar" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "spottedLunarEclipses" INTEGER NOT NULL DEFAULT 0,
    "spottedSolarEclipses" INTEGER NOT NULL DEFAULT 0,
    "spottedMeteorShowers" INTEGER NOT NULL DEFAULT 0,
    "spottedSupermoons" INTEGER NOT NULL DEFAULT 0,
    "spottedMicromoons" INTEGER NOT NULL DEFAULT 0,
    "spottedPlanetaryAlignments" INTEGER NOT NULL DEFAULT 0,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "description" TEXT NOT NULL,
    "id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "isSpotted" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID,
    "type" "ActionType" NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
