-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "password" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "content" SET DEFAULT '';
