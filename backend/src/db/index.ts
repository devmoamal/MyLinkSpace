import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

import { dbConfig, isDevelopment } from "@/config";
import * as schema from "@/db/schema";

const client = new Database(dbConfig.path);

export const db = drizzle(client, {
  schema,
  logger: isDevelopment,
});
