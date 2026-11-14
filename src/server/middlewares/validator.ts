import Joi from 'joi' // AI Refactor: Changed import to default import because joi 17.x provides a default export and ships its own types; recommended pattern for joi >=17 (package: joi 17.13.8)

import { Context } from 'koa'
import { IMiddleware } from 'koa-router'
import { FieldValidationError } from '../../errors'

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
    const joiSchema = Joi.object(schema as any) // AI Refactor: Wrap plain SchemaMap in Joi.object(...) because joi 17 requires an explicit schema instance rather than a plain description (package: joi 17.13.8)
    const valResult = joiSchema.validate(ctx, { // AI Refactor: Use schema.validate(value, options) since global Joi.validate was removed/deprecated in joi 17; preserves options and behavior (package: joi 17.13.8)
      allowUnknown: true,
      abortEarly: false
    })

    if (valResult.error) {
      throw new FieldValidationError(
        valResult.error.message,
        valResult.error.details.map(f => ({
          message: f.message,
          path: f.path,
          type: f.type
        })),
        valResult.error
      )
    }

    await next()
  }
}
