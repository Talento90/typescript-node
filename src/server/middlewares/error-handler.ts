import { Context } from 'koa'

export async function errorHandler(ctx: Context, next: () => Promise<any>) {
  try {
    await next()
  } catch (e) {
    // TODO: sanitize error
  }
}
