import * as Joi from "joi";

var createTaskModel = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
});

var updateTaskModel = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    completed: Joi.boolean()
});

