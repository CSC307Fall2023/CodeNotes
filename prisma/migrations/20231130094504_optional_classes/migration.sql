-- DropForeignKey
ALTER TABLE "Notebook" DROP CONSTRAINT "Notebook_classId_fkey";

-- AlterTable
ALTER TABLE "Notebook" ALTER COLUMN "classId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notebook" ADD CONSTRAINT "Notebook_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
