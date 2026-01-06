import { z } from "zod";
import type { TimeStringValue } from "./types";

// Environment schema validation
const envSchema = z.object({
  // Server Configuration
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string(),

  // Database Configuration
  DATABASE_PATH: z.string().default("file:./database.db"),

  // Environment
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  // Logging
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),

  // Password
  SALT: z.string().min(1, "SALT is required"),

  // Auth
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  // This is the time the token will be expired
  // Example: 7d, 1h, 30m, 1s
  // Default: 7d
  JWT_EXPIRES_IN: z
    .string()
    .regex(/^\d+(s|m|h|d)?$/, "Invalid JWT_EXPIRES_IN format")
    .default("7d") as z.ZodType<TimeStringValue>,
});

// Validate environment variables
const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  console.log("(.env) Invalid environment configuration");
  console.log("(.env) Error: " + envValidation.error.flatten());

  process.exit(1);
}

// Export validated configuration
export const env = envValidation.data;

// Environment helpers
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
