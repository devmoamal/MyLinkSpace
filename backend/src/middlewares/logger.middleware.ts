import { logger } from "hono/logger";

// TODO: update logger to own logger middleware
export default function LoggerMiddleware() {
  return logger();
}
