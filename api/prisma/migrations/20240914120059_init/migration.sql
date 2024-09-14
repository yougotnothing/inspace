-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('SOLAR_ECLIPSE', 'LUNAR_ECLIPSE', 'METEOR_SHOWER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "role" "Role" NOT NULL DEFAULT 'USER',
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT "",
    "isHaveAvatar" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" UUID NOT NULL,
    "type" "ActionType" NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "isSpotted" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
