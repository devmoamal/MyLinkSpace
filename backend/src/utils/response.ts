import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { ApiResponse } from "@/types/response";

type SuccessOptions<T> = {
  data: T;
  message?: string;
  status?: ContentfulStatusCode;
};

type ErrorOptions = {
  message: string;
  status?: ContentfulStatusCode;
  errors?: Record<string, string[]>;
};

export const Response = {
  success<T>(c: Context, options: SuccessOptions<T>) {
    const { data, message = "Success", status = 200 } = options;
    return c.json<ApiResponse<T>>(
      { ok: true, code: status, message, data },
      status
    );
  },

  error(c: Context, options: ErrorOptions) {
    const { message, status = 400, errors } = options;
    return c.json<ApiResponse<null>>(
      { ok: false, code: status, message, errors },
      status
    );
  },
};
