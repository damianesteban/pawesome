// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@/app/api/trpc/router';

export const trpc = createTRPCReact<AppRouter>();

// Create a TRPC client
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api/trpc', // This is the correct way to specify the URL
    }),
  ],
});