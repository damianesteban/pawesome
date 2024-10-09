import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Context, createContext } from '../context';
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
    transformer: superjson,
});

export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;


// App Router Definition
// NOTE: This will eventually be broken out into multiple routers
export const appRouter = t.router({
    getRescue: t.procedure
        .input(z.object({
            id: z.string(),
            name: z.string(),
            animalType: z.enum(['cat', 'dog']),
            breed: z.string(),   
        }))
        .query(async ({ input, ctx }) => {
            const rescue = await ctx.prisma.rescue.findUnique({
                where: { id: input.id },
            });
            return rescue;
        }),
    createRescue: t.procedure
        .input(z.object({
            name: z.string(),
            animalType: z.enum(['CAT', 'DOG']),
            breed: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            const rescue = await ctx.prisma.rescue.create({
                data: {
                    name: input.name,
                    animalType: input.animalType,
                    breed: input.breed,
                }
            });
            return rescue;
        }),
})

export const createCaller = createCallerFactory(appRouter);
export const createAsyncCaller = async () => {
    const context = await createContext();
    return createCaller(context);
  };
export type AppRouter = typeof appRouter;