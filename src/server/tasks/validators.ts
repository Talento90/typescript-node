import * as Joi from 'joi'

export const updateTask: Joi.SchemaMap = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  done: Joi.boolean().required()
}

export const createTask: Joi.SchemaMap = {
  name: Joi.string().required(),
  description: Joi.string().required()
}
