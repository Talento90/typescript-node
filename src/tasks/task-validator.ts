import * as Joi from "joi";

export const createTaskModel = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
});

export const updateTaskModel = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    completed: Joi.boolean()
});