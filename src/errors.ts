export class AppError {
  public code: number
  public message: string
  public error: Error

  constructor(code: number, message: string, error?: Error) {
    this.code = code
    this.message = message
    this.error = error
  }

  public toModel() {
    return {
      code: this.code,
      message: this.message
    }
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(20000, message)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, error?: Error) {
    super(30000, message, error)
  }
}

export class FieldValidationError extends AppError {
  public fields: FieldError[]

  constructor(message: string, fields: FieldError[], error?: Error) {
    super(30001, message, error)
    this.fields = fields
  }

  public toModel() {
    return {
      code: this.code,
      message: this.message,
      fields: this.fields
    }
  }
}

export class UnauthorizedError extends AppError {
  constructor(error?: Error) {
    super(30002, 'Unauthorized user')
  }
}

export class PermissionError extends AppError {
  constructor(error?: Error) {
    super(30003, 'Permission denied', error)
  }
}

export interface FieldError {
  message: string
  type: string
  path: string[]
}
