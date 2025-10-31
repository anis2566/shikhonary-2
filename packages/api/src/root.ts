import { createTRPCRouter } from "./trpc";

import { authRouter } from "./routers/auth";
import { testRouter } from "./routers/test";

export const appRouter = createTRPCRouter({
    auth: authRouter,
    test: testRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;