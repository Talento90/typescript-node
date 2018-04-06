import * as Joi from 'joi'

export const task: Joi.SchemaMap = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  done: Joi.boolean().required()
}
