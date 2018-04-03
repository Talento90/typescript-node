import * as jwt from 'jsonwebtoken'
import { Context } from 'koa'
import { IMiddleware } from 'koa-router'
import { Authenticator, Role } from '../../lib/authentication'

export function authentication(
  authenticator: Authenticator,
  roles: Role[]
): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const token = ctx.headers.access_token

    try {
      ctx.state.user = await authenticator.validate(token)

      await next()
    } catch (err) {
      // TODO: Throw error
      throw err
    }
  }
}
