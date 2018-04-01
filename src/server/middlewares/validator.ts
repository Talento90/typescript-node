import * as Joi from 'joi'
import { Context } from 'koa'
import { IMiddleware } from 'koa-router'

export function validate(schema: Joi.SchemaMap): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const valResult = Joi.validate(ctx, schema, {
      allowUnknown: true,
      abortEarly: false
    })

    if (valResult.error) {
      throw valResult.error
    }

    await next()
  }
}
