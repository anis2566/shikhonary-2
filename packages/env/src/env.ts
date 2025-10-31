import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    shared: {
        NODE_ENV: z
            .enum(["development", "production", "test"])
            .default("development"),
    },
    server: {
        AUTH_SECRET: z.string()
    },
    client: {
        NEXT_PUBLIC_TEST: z.string(),
    },
    runtimeEnv: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,

        // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    },
    skipValidation:
        !!process.env.CI ||
        !!process.env.SKIP_ENV_VALIDATION ||
        process.env.npm_lifecycle_event === "lint",
});