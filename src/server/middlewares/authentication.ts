import { Context } from 'koa'
import { IMiddleware } from 'koa-router'
import { Authenticator } from '../../lib/authentication'

export function authentication(authenticator: Authenticator): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const token = ctx.headers.authorization
    const user = await authenticator.validate(token)

    ctx.state.user = user
    await next()
  }
}
