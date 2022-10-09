-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'SUPERVISER', 'SUPERUSER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
