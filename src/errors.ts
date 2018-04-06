export class AppError {
  public code: number
  public message: string
  public error: Error

  constructor(code: number, message: string, error?: Error) {
    this.code = code
    this.message = message
    this.error = error
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(20000, message)
  }
}

export class ValidationError extends AppError {
  constructor(code: number, message: string, error: Error) {
    super(30000, message, error)
  }
}

export class UnauthorizedError extends AppError {
  constructor(code: number, message: string) {
    super(30001, message)
  }
}

export class PermissionError extends AppError {
  constructor(code: number, message: string) {
    super(30002, message)
  }
}
