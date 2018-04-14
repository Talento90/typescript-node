import { Context } from 'koa'
import { IMiddleware } from 'koa-router'
import { PermissionError } from '../../errors'
import { AuthUser, Role } from '../../lib/authentication'

export function authorization(roles: Role[]): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const user: AuthUser = ctx.state.user

    if (roles.indexOf(user.role) < 0) {
      throw new PermissionError()
    }

    await next()
  }
}
