import { Context } from 'koa'

export async function responseTime(ctx: Context, next: () => Promise<any>) {
  const start = Date.now()

  await next()

  ctx.response.headers['X-Response-Time'] = Date.now() - start
}
