import { ValidationError } from "@/utils/errors";
import type { Context, Next } from "hono";
import { type ZodType } from "zod";

// Validate request params middleware
export const validateParams =
  (schema: ZodType) => async (c: Context, next: Next) => {
    const result = schema.safeParse(c.req.param());

    if (!result.success) {
      const flattened = result.error.flatten((issue) => issue.message);
      throw new ValidationError("Validation failed", flattened.fieldErrors);
    }

    c.set("params", result.data);
    await next();
  };

// Validate request body middleware
export const validateBody =
  (schema: ZodType) => async (c: Context, next: Next) => {
    const body = await c.req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      const flattened = result.error.flatten((issue) => issue.message);
      throw new ValidationError("Validation failed", flattened.fieldErrors);
    }

    c.set("body", result.data);
    await next();
  };
