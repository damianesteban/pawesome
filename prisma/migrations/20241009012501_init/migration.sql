-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('DOG', 'CAT');

-- CreateTable
CREATE TABLE "Rescue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "animalType" "AnimalType" NOT NULL,
    "breed" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rescue_pkey" PRIMARY KEY ("id")
);
