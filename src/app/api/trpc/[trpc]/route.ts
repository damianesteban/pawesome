import { appRouter } from "../router";
import { fetchRequestHandler} from "@trpc/server/adapters/fetch";
import { createContext } from "../context";

// This is the entrypoint for the API
const handler = (request: Request) => {
    return fetchRequestHandler({
      endpoint: '/api/trpc',
      req: request,
      router: appRouter,
      createContext: async () => createContext({ req: request }),
    });
  };
  
  export { handler as GET, handler as POST };