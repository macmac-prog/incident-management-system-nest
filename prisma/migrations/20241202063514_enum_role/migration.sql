/*
  Warnings:

  - The `name` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ADMIN', 'TECHNICIAN', 'USER');

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "name",
ADD COLUMN     "name" "UserRoles" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "Roles";
