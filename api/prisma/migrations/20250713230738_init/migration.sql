-- AlterEnum
ALTER TYPE "EventType" ADD VALUE 'LUNAR_APSIS';

-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
