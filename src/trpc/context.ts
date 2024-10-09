import { prisma } from '@/lib/prisma';
import { inferAsyncReturnType } from '@trpc/server';

// This function will define the context for your tRPC router. Include any services or utilities that you want to be available in your tRPC procedures.
export const createContext = async () => ({
  prisma,
})

// Infer the context type based on the return of createContext function
export type Context = inferAsyncReturnType<typeof createContext>;