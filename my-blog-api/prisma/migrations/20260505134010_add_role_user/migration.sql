-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'VIP');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'GUEST';
