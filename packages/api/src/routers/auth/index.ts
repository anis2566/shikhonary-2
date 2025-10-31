import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure, publicProcedure } from "../../trpc";

export const authRouter = {
    getSession: publicProcedure.query(async ({ ctx }) => {
        if (!ctx.session) return null;
        return {
            ...ctx.session,
        };
    }),
    getSecretMessage: protectedProcedure.query(() => {
        return "you can see this secret message!";
    }),
} satisfies TRPCRouterRecord;