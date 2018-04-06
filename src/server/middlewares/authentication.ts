import * as jwt from 'jsonwebtoken'
import { Context } from 'koa'
import { IMiddleware } from 'koa-router'
import { PermissionError } from '../../errors'
import { Authenticator, Role } from '../../lib/authentication'

export function authentication(
  authenticator: Authenticator,
  roles: Role[]
): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const token = ctx.headers.authorization

    try {
      const user = await authenticator.validate(token)

      if (roles.indexOf(user.role) < 0) {
        throw new PermissionError()
      }

      ctx.state.user = user
      await next()
    } catch (err) {
      throw err
    }
  }
}
