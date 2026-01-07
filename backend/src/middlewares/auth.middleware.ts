import type { MiddlewareHandler } from "hono";
import { verifyToken } from "@/utils/jwt";
import { AuthorizationError, ForbiddenError } from "@/utils/errors";

// TODO: Adding token validation

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("authorization");

  if (!authHeader?.startsWith("Bearer ")) throw new AuthorizationError();

  const token = authHeader.slice(7);

  try {
    const payload = verifyToken(token);
    c.set("user", payload);
    await next();
  } catch {
    throw new ForbiddenError();
  }
};
