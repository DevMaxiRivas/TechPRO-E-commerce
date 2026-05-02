/**
 * Base application error.
 * All custom errors extend this class.
 */
export abstract class AppError extends Error {
  /** HTTP-like status code for context */
  abstract readonly statusCode: number;
  /** Short code used in logs (e.g. "NOT_FOUND") */
  abstract readonly code: string;
  /** Whether this error is expected / operational (true) or a programming bug (false) */
  abstract readonly isOperational: boolean;

  /** Message shown to the end user in the UI */
  abstract readonly userMessage: string;
  /** Optional details for the user (e.g. what they can do next) */
  readonly userHint?: string;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
    // Restore prototype chain (required when extending built-ins in TS)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// ---------------------------------------------------------------------------
// 404 – Resource not found
// ---------------------------------------------------------------------------
export class NotFoundError extends AppError {
  readonly statusCode = 404;
  readonly code = "NOT_FOUND";
  readonly isOperational = true;
  readonly userMessage = "The page or resource you requested could not be found.";
  readonly userHint = "Check the URL or go back to the home page.";

  constructor(resource = "Resource", options?: ErrorOptions) {
    super(`${resource} not found`, options);
  }
}

// ---------------------------------------------------------------------------
// 401 / 403 – Auth errors
// ---------------------------------------------------------------------------
export class UnauthorizedError extends AppError {
  readonly statusCode = 401;
  readonly code = "UNAUTHORIZED";
  readonly isOperational = true;
  readonly userMessage = "You need to sign in to access this content.";
  readonly userHint = "Please log in and try again.";

  constructor(message = "Unauthorized", options?: ErrorOptions) {
    super(message, options);
  }
}

export class ForbiddenError extends AppError {
  readonly statusCode = 403;
  readonly code = "FORBIDDEN";
  readonly isOperational = true;
  readonly userMessage = "You don't have permission to access this resource.";
  readonly userHint = "Contact your administrator if you think this is a mistake.";

  constructor(message = "Forbidden", options?: ErrorOptions) {
    super(message, options);
  }
}

// ---------------------------------------------------------------------------
// 422 – Validation error
// ---------------------------------------------------------------------------
export class ValidationError extends AppError {
  readonly statusCode = 422;
  readonly code = "VALIDATION_ERROR";
  readonly isOperational = true;
  readonly userMessage = "Some of the information you submitted is invalid.";
  readonly userHint = "Review the form fields and try again.";

  /** Field-level validation details, if available */
  readonly fieldErrors?: Record<string, string[]>;

  constructor(
    message = "Validation failed",
    fieldErrors?: Record<string, string[]>,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.fieldErrors = fieldErrors;
  }
}

// ---------------------------------------------------------------------------
// 503 – External service / network error
// ---------------------------------------------------------------------------
export class ServiceUnavailableError extends AppError {
  readonly statusCode = 503;
  readonly code = "SERVICE_UNAVAILABLE";
  readonly isOperational = true;
  readonly userMessage = "A service we depend on is temporarily unavailable.";
  readonly userHint = "Please try again in a few moments.";

  constructor(service = "External service", options?: ErrorOptions) {
    super(`${service} is unavailable`, options);
  }
}

// ---------------------------------------------------------------------------
// 408 – Timeout
// ---------------------------------------------------------------------------
export class TimeoutError extends AppError {
  readonly statusCode = 408;
  readonly code = "TIMEOUT";
  readonly isOperational = true;
  readonly userMessage = "The request took too long to complete.";
  readonly userHint = "Check your connection and try again.";

  constructor(message = "Request timed out", options?: ErrorOptions) {
    super(message, options);
  }
}

// ---------------------------------------------------------------------------
// 500 – Unexpected / internal error
// ---------------------------------------------------------------------------
export class InternalError extends AppError {
  readonly statusCode = 500;
  readonly code = "INTERNAL_ERROR";
  readonly isOperational = false;
  readonly userMessage = "An unexpected error occurred on our end.";
  readonly userHint = "Our team has been notified. Please try again later.";

  constructor(message = "Internal server error", options?: ErrorOptions) {
    super(message, options);
  }
}

// ---------------------------------------------------------------------------
// Helper: coerce any unknown thrown value into an AppError
// ---------------------------------------------------------------------------
export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error;

  if (error instanceof Error) {
    return new InternalError(error.message, { cause: error });
  }

  return new InternalError(String(error));
}
