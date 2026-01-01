import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/index.ts",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_PATH || "file:./database.db",
  },
} satisfies Config;
