import * as Joi from 'joi'
import { User } from '../../entities'

export interface CreateUser {
  email: string
  password: string
  firstName: string
  lastName: string
}

export const createUserModel = Joi.object().keys({
  email: Joi.string()
    .email()
    .trim()
    .required(),
  password: Joi.string()
    .trim()
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
})

export class UserModel {
  public id: number
  public email: string
  public firstName: string
  public lastName: string
  public created: Date
  public updated: Date

  constructor(user: User) {
    this.id = user.id
    this.email = user.email
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.created = user.created
    this.updated = user.updated
  }
}
