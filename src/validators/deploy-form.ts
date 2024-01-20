import { z } from "zod";
const envSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});
export const deployForm = z.object({
  url: z
    .string()
    .url()
    .regex(/https?:\/\/(www\.)?github\.com\/.*/, {
      message: "Only Github URLs are allowed",
    }),
  env: z.string().optional(),
  buildcommand: z.string().optional(),
  runcommand: z.string().optional(),
});
export type DeployForm = z.infer<typeof deployForm>;
