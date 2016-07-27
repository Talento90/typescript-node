import * as Joi from "joi";

export const createUserModel = Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
});

export const updateUserModel = Joi.object().keys({
    name: Joi.string().required()
});

export const loginUserModel = Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required()
});