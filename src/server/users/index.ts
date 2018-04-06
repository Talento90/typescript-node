import * as Joi from 'joi'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import { ServiceContainer } from '../../container'
import { Role } from '../../lib/authentication'
import { UserManager } from '../../managers'
import * as middleware from '../middlewares'
import { UserController } from './controller'
import * as validators from './validators'

export function init(server: Koa, container: ServiceContainer) {
  const router = new Router({ prefix: '/api/v1/users' })

  router.use(middleware.logRequest(container.logger))
  router.use(middleware.errorHandler)

  const controller = new UserController(container.managers.user)

  router.get(
    '/me',
    middleware.authentication(container.lib.authenticator, [
      Role.user,
      Role.admin
    ]),
    controller.get.bind(controller)
  )

  router.post(
    '/',
    bodyParser(),
    middleware.validate({ request: { body: validators.createUser } }),
    controller.create.bind(controller)
  )

  router.post(
    '/login',
    bodyParser(),
    middleware.validate({ request: { body: validators.login } }),
    controller.login.bind(controller)
  )

  router.put(
    '/',
    bodyParser(),
    middleware.validate({ request: { body: validators.login } }),
    controller.update.bind(controller)
  )

  router.put(
    '/password',
    bodyParser(),
    middleware.validate({
      request: {
        body: {
          password: Joi.string()
            .trim()
            .required()
        }
      }
    }),
    controller.changePassword.bind(controller)
  )

  server.use(router.routes())
}
