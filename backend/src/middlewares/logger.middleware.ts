import { logger } from "hono/logger";

// Return a Hono logger middleware
export default function LoggerMiddleware() {
  return logger();
}
