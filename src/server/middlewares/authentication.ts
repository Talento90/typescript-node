import { Context } from 'koa'
import { IMiddleware } from 'koa-router'
import { Authenticator } from '../../lib/authentication'

export function authentication(authenticator: Authenticator): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    let token = ctx.headers.authorization // AI Refactor: switched to 'let' and preparing to normalize the Authorization header because jsonwebtoken 9.x expects only the raw token; ensures we don't pass "Bearer ..." to verification (package: jsonwebtoken 9.0.0).
    if (typeof token === 'string') { // AI Refactor: added check to safely process only string headers and extract the Bearer token to avoid malformed inputs (package: jsonwebtoken 9.0.0).
      const match = token.match(/^Bearer\s+(.+)$/i) // AI Refactor: parse the Authorization header to extract the raw token, as jsonwebtoken 9.x hardened verification expects the token without the "Bearer " prefix.
      if (match) token = match[1] // AI Refactor: pass only the raw token to the authenticator to maintain expected behavior under jsonwebtoken 9.x.
    }
    const user = await authenticator.validate(token)

    ctx.state.user = user
    await next()
  }
}
