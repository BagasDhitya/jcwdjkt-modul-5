/*
  Warnings:

  - Made the column `isPublished` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "isPublished" SET NOT NULL,
ALTER COLUMN "isPublished" SET DEFAULT false;
