import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    ADMIN_MAIL: z.string().email().min(1),
    ADMIN_PASS: z.string().min(8),
    DOMAIN: z.string().min(1),
  },
  client: {},
  experimental__runtimeEnv: {},
});
