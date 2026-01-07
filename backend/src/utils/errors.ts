import type { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends Error {
  constructor(
    public override message: string,
    public code: ContentfulStatusCode = 500,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, errors: Record<string, string[]> = {}) {
    super(message, 400, errors);
  }
}

export class UniqueError extends AppError {
  constructor(message: string, errors: Record<string, string[]> = {}) {
    super(message, 409, errors);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}

export class CustomError extends AppError {
  constructor(
    message: string = "Something went wrong",
    code: ContentfulStatusCode = 400
  ) {
    super(message, code);
  }
}
export class ServerError extends AppError {
  constructor(message: string = "Internal server error") {
    super(message, 500);
  }
}

export class UnknownError extends AppError {
  constructor(message: string = "Internal server error") {
    super(message, 500);
  }
}
