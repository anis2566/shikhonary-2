import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import path from "path";

// ----------------------------------------------------------------------
// 🚨 CRITICAL FIX: Only import and configure dotenv on the Server side.
// ----------------------------------------------------------------------
if (typeof window === "undefined") {
    // We are on the Server (Node.js)
    // We can safely use 'dotenv' and 'process.cwd()'

    // NOTE: We use a dynamic import to ensure the 'dotenv' module is not
    // included in the client-side bundle even if an unused import remains.
    import("dotenv").then(({ config }) => {
        // Load .env from monorepo root
        config({ path: path.resolve(process.cwd(), "../../.env") });
    });
}
// ----------------------------------------------------------------------

export const env = createEnv({
    shared: {
        NODE_ENV: z
            .enum(["development", "production", "test"])
            .default("development"),
    },
    server: {
        AUTH_SECRET: z.string(),
        DATABASE_URL: z.string(),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.string(),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL,
        AUTH_SECRET: process.env.AUTH_SECRET,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
    // You can still keep the previous guard rail for extra safety:
    skipValidation:
        !!process.env.CI ||
        !!process.env.SKIP_ENV_VALIDATION ||
        process.env.npm_lifecycle_event === "lint" ||
        !!process.env.NEXT_PUBLIC_VERCEL_ENV,
});
