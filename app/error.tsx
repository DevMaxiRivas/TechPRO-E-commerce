"use client";

import { useEffect } from "react";
import { logError, getUserFacingMessage } from "@/lib/error-logger";
import { AppError } from "@/lib/errors";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Logs to console (swap for Sentry / Datadog / etc. in production)
    logError(error, "AppRouter");
  }, [error]);

  const { message, hint } = getUserFacingMessage(error);
  const isOperational = error instanceof AppError && error.isOperational;
  const code = error instanceof AppError ? error.code : "INTERNAL_ERROR";

  return (
    <main className="min-h-screen px-4 py-16 bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/60">

        {/* Title */}
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {isOperational ? "Something went wrong" : "Unexpected error"}
        </h1>

        {/* User-facing message */}
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          {message}
        </p>

        {/* Optional hint */}
        {hint && (
          <p className="mt-2 text-sm text-slate-500">{hint}</p>
        )}

        {/* Error detail box */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Error code
            </p>
            <span className="rounded-full bg-slate-200 px-3 py-0.5 text-xs font-mono font-medium text-slate-700">
              {code}
            </span>
          </div>

          {/* Show technical message only for non-operational errors (bugs) */}
          {!isOperational && error?.message && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Technical details
              </p>
              <p className="mt-1 text-sm font-mono leading-6 text-slate-700 break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Try again
          </button>
          <p className="text-sm text-slate-500">
            If the problem continues, refresh the page or contact support.
          </p>
        </div>

      </div>
    </main>
  );
}
