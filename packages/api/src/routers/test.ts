import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../trpc";

export const testRouter = {
    get: publicProcedure
        .query(async ({ ctx }) => {
            return "Working"
        })
} satisfies TRPCRouterRecord;