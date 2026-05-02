import {
  AppError,
  InternalError,
  toAppError,
  ValidationError,
} from "./errors";

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface ErrorLogEntry {
  level: LogLevel;
  code: string;
  statusCode: number;
  message: string;
  isOperational: boolean;
  timestamp: string;
  stack?: string;
  fieldErrors?: Record<string, string[]>;
  cause?: unknown;
}

/**
 * Builds a structured log entry from any error.
 * Non-operational errors (bugs) are logged at "error" level;
 * operational errors use "warn" so on-call noise is reduced.
 */
export function buildLogEntry(error: unknown): ErrorLogEntry {
  const appError = toAppError(error);

  const level: LogLevel = appError.isOperational ? "warn" : "error";

  const entry: ErrorLogEntry = {
    level,
    code: appError.code,
    statusCode: appError.statusCode,
    message: appError.message,
    isOperational: appError.isOperational,
    timestamp: new Date().toISOString(),
    cause: appError.cause,
  };

  // Include stack only for unexpected errors to keep warn logs concise
  if (!appError.isOperational) {
    entry.stack = appError.stack;
  }

  // Attach field errors for validation issues
  if (appError instanceof ValidationError && appError.fieldErrors) {
    entry.fieldErrors = appError.fieldErrors;
  }

  return entry;
}

/**
 * Logs the error using the appropriate console method based on its severity.
 *
 * In production you can swap `console.*` calls for your real logger
 * (e.g. Pino, Winston, Datadog, Sentry, etc.).
 */
export function logError(error: unknown, context?: string): ErrorLogEntry {
  const entry = buildLogEntry(error);

  const prefix = context ? `[${context}]` : "[ErrorBoundary]";
  const tag = `${prefix} ${entry.code} (${entry.statusCode})`;

  switch (entry.level) {
    case "error":
      console.log(tag, entry);
      break;
    case "warn":
      console.log(tag, entry);
      break;
    default:
      console.log(tag, entry);
  }

  return entry;
}

/**
 * Returns the user-facing message and optional hint for any error.
 * Falls back to a generic message for plain Error / unknown values.
 */
export function getUserFacingMessage(error: unknown): {
  message: string;
  hint?: string;
} {
  if (error instanceof AppError) {
    return { message: error.userMessage, hint: error.userHint };
  }

  // Plain Error or unknown — surface a safe generic message
  const fallback = new InternalError();
  return { message: fallback.userMessage, hint: fallback.userHint };
}
