import * as Joi from 'joi'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import { ServiceContainer } from '../../container'
import { Role } from '../../lib/authentication'
import { UserManager } from '../../managers'
import * as middleware from '../middlewares'
import { UserController } from './controller'
import { createUserModel } from './model'

export function init(server: Koa, container: ServiceContainer) {
  const router = new Router({ prefix: '/api/v1/users' })

  router.use(middleware.logRequest(container.logger))
  router.use(middleware.errorHandler)

  const controller = new UserController(container.managers.user)

  router.post(
    '/',
    bodyParser(),
    middleware.validate(createUserModel),
    controller.create.bind(this)
  )

  router.get(
    '/me',
    middleware.authentication(container.lib.authenticator, [
      Role.user,
      Role.admin
    ]),
    controller.get.bind(this)
  )

  server.use(router.routes())
}
