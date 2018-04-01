import * as jwt from 'jsonwebtoken'
import { Context } from 'koa'
import { IMiddleware } from 'koa-router'

export function authentication(roles: string[]): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const token = ctx.headers.access_token

    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY || 'secret')

      ctx.state.user = {
        id: 123,
        role: ''
      }

      await next()
    } catch (err) {
      throw err
    }
  }
}
