import type { Context } from "hono";
import { AppError } from "@/utils/errors";
import { logger } from "@/utils/logger";
import { Response } from "@/utils/response";

// TODO: update error logging
export const errorHandler = (err: any, c: Context) => {
  // Check if it's our error via name or property (more reliable than instanceof)
  if (err.name === "AppError" || err instanceof AppError || err.code === 400) {
    logger.error("N] App error", err.message);
    return Response.error(c, {
      message: err.message,
      status: err.code || 400,
      errors: err.errors,
    });
  }

  // If it's a native JSON SyntaxError, handle it as a 400
  if (err instanceof SyntaxError && err.message.includes("JSON")) {
    return Response.error(c, {
      message: "Invalid JSON format",
      status: 400,
    });
  }

  logger.error("C] Unhandled error:", err);
  return Response.error(c, {
    message: "Internal server error",
    status: 500,
  });
};
