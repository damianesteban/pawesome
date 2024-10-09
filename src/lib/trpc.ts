// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { AppRouter } from '@/trpc/router/_app';

// Create a TRPC client
export const trpc = createTRPCReact<AppRouter>();