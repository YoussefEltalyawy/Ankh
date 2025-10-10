-- Add new columns to Task table
-- First add the columns that can have defaults
ALTER TABLE "Task" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Task" ADD COLUMN "priority" TEXT;

-- Add updatedAt column with a default value for existing rows
ALTER TABLE "Task" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Update existing rows to have updatedAt set to createdAt (since we don't have the original creation time)
UPDATE "Task" SET "updatedAt" = "createdAt" WHERE "updatedAt" = "createdAt";

-- Now we can remove the default since all rows have values
ALTER TABLE "Task" ALTER COLUMN "updatedAt" DROP DEFAULT;
