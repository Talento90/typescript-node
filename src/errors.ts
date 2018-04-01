class AppError {
  public code: number
  public message: string

  constructor(code: number, message: string) {
    this.code = code
    this.message = message
  }
}

class ValidationError extends AppError {
  constructor(code: number, message: string) {
    super(code, message)
  }
}
