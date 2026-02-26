import type { ZodIssue } from 'zod'

/** Base API error with statusCode and optional Zod issues for validation errors. */
export class ApiError extends Error {
  statusCode: number
  type: string
  errors?: ZodIssue[]

  constructor(
    type?: string,
    message?: string,
    statusCode?: number,
  ) {
    super(message)

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.type = type ?? ''
    this.statusCode = Number(statusCode ?? 500)
  }
}

export class ValidationError extends ApiError {
  constructor(type: string, message: string) {
    super(type, message, 422)
  }

  setErrors(errors: ZodIssue[]): this {
    this.errors = errors
    return this
  }
}

/** Thrown when request body/query fails Zod validation (422). */
export class InvalidRequestError extends ValidationError {
  constructor(message: string) {
    super('E_INVALID_REQUEST', message)
  }
}

/** Thrown for domain/business rule violations (400). */
export class BadRequestError extends ApiError {
  constructor(message: string, type?: string) {
    super(type ?? 'E_BAD_REQUEST', message, 400)
  }
}
