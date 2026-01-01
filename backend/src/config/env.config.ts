import { z } from "zod";

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
