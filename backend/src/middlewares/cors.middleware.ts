import { cors } from "hono/cors";

// TODO: update origin when publishing the app
// Change it to: 'https://yourdomain.com' or ['https://yourdomain.com', 'https://app.yourdomain.com']

export const corsMiddleware = cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  exposeHeaders: ["Content-Length", "X-Request-Id"],
  maxAge: 600,
  credentials: false,
});
