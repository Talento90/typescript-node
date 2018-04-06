import { Context } from 'koa'
import { IMiddleware } from 'koa-router'
import { Logger } from 'pino'

export function logRequest(logger: Logger): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const start = Date.now()

    await next()

    const message = `[${ctx.status}] ${ctx.method} ${ctx.path}`
    const logData: any = {
      method: ctx.method,
      path: ctx.path,
      statusCode: ctx.status,
      timeMs: Date.now() - start
    }

    if (ctx.status >= 400) {
      logger.error(message, logData, ctx.body)
    } else {
      logger.info(message, logData)
    }
  }
}
