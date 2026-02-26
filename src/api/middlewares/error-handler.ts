import type { Request, Response, NextFunction } from 'express'
import { ApiError } from '@app/utils/app-error'

/** Sends ApiError as JSON with statusCode; unknown errors become 500 E_INTERNAL. */
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const error = err instanceof Error ? err : new Error(String(err))
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
      ...(error.errors && { errors: error.errors }),
    })
    return
  }

  res.status(500).json({
    type: 'E_INTERNAL',
    message: error.message ?? 'Internal server error',
  })
}
