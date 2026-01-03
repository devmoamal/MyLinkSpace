import type { Context } from "hono";
import { AppError } from "@/utils/errors";
import { logger } from "@/utils/logger";
import { Response } from "@/utils/response";

export const errorHandler = (err: Error, c: Context) => {
  // If the error is an instance of AppError, use its properties to format the response
  if (err instanceof AppError) {
    logger.error("N] App error", err.message);
    return Response.error(c, {
      message: err.message,
      status: err.code,
      errors: err.errors,
    });
  }

  // If the error is unhandled, return a generic internal server error response
  logger.error("C] Unhandled error:", err);
  return Response.error(c, {
    message: "Internal server error",
    status: 500,
  });
};
