import { PrismaClient } from '@prisma/client';

// Ensure that the PrismaClient is defined globally
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a new PrismaClient instance if one doesn't already exist
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Optional logging of queries
  });

// Assign the PrismaClient instance to the `global` object if it doesn't already exist
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;