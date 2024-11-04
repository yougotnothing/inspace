-- CreateEnum
CREATE TYPE "Distance" AS ENUM ('AU', 'KM');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "shownDistance" "Distance" NOT NULL DEFAULT 'KM',
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'Europe/Warsaw';
