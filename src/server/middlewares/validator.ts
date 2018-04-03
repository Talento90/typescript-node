import * as Joi from 'joi'
import { Context } from 'koa'
import * as bodyParser from 'koa-bodyparser'
import { IMiddleware } from 'koa-router'

export function validate(schema: Joi.ObjectSchema): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const valResult = Joi.validate(ctx.request.body, schema, {
      allowUnknown: true,
      abortEarly: false
    })

    if (valResult.error) {
      throw valResult.error
    }

    await next()
  }
}
