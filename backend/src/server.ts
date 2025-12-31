import { Hono } from "hono";
import { env } from "@/config/env.config.ts";

export function server() {
  // Creating Hono app
  const app = new Hono();

  // Start Bun server
  Bun.serve({
    // Place environment variables
    port: env.PORT,
    hostname: env.HOST,
    // Bind Bun fetch to Hono
    fetch: app.fetch,
  });

  console.log(`Server started on http://${env.HOST}:${env.PORT}`);

  return app;
}
