/*
  Warnings:

  - The `name` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TeamCategory" AS ENUM ('NETWORK_TEAM', 'HARDWARE_TEAM', 'SECURITY_TEAM', 'INFRASTRUCTURE_TEAM');

-- DropIndex
DROP INDEX "Team_name_key";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "name",
ADD COLUMN     "name" "TeamCategory";
