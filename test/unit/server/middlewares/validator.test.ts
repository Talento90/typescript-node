import { expect } from 'chai'
import * as Joi from 'joi'
import { FieldValidationError } from '../../../../src/errors'
import { validate } from '../../../../src/server/middlewares'

describe('validate', () => {
  it('Should not throw an error when body valid', async () => {
    const ctx: any = {
      request: {
        body: { name: 'test' }
      }
    }

    const schema = { request: { body: { name: Joi.string().required() } } }

    const validateMiddleware = validate(schema)

    await validateMiddleware(ctx, () => Promise.resolve())
  })

  it('Should throw an error when body is not valid', async () => {
    const ctx: any = {
      request: {
        body: {}
      }
    }

    const schema = { request: { body: { name: Joi.string().required() } } }
    const validateMiddleware = validate(schema)

    try {
      await validateMiddleware(ctx, () => Promise.resolve())
      expect.fail('Should not reach this point')
    } catch (error) {
      expect(error).instanceof(FieldValidationError)
      expect(error.fields[0].message).equals('"name" is required')
    }
  })
})
