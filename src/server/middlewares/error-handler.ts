import { Context } from 'koa'
import { AppError } from '../../errors'

const httpCodes = {
  10000: 500,
  20000: 404,
  30000: 400,
  30001: 401,
  30002: 403
}

export async function errorHandler(ctx: Context, next: () => Promise<any>) {
  try {
    await next()
  } catch (err) {
    if (err instanceof AppError) {
      ctx.body = err
      ctx.status = httpCodes[err.code] ? httpCodes[err.code] : 500
    } else {
      ctx.body = new AppError(9, 'Internal Error Server')
      ctx.status = 500
    }
  }
}
