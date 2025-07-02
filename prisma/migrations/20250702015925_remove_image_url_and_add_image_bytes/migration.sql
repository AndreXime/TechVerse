/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "imageUrl",
ADD COLUMN     "image" BYTEA,
ALTER COLUMN "linkedin" DROP NOT NULL,
ALTER COLUMN "github" DROP NOT NULL,
ALTER COLUMN "genericSocial" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageUrl",
ADD COLUMN     "image" BYTEA;
