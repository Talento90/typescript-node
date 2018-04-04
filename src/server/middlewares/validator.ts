import * as Joi from 'joi'
import { Context } from 'koa'
import * as bodyParser from 'koa-bodyparser'
import { IMiddleware } from 'koa-router'

export interface SchemaMap {
  params?: { [key: string]: Joi.SchemaLike }

  request?: {
    body?: { [key: string]: Joi.SchemaLike } | Joi.ArraySchema
    headers?: { [key: string]: Joi.SchemaLike }
  }

  response?: {
    body?: { [key: string]: Joi.SchemaLike } | Joi.ArraySchema
    headers?: { [key: string]: Joi.SchemaLike }
  }
}

export function validate(schema: SchemaMap): IMiddleware {
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
