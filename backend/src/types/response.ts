import type { ContentfulStatusCode } from "hono/utils/http-status";

export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  message: string;
  code?: ContentfulStatusCode;
  errors?: Record<string, string[]>;
};
