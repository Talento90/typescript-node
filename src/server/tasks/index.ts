import * as Joi from 'joi'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import { ServiceContainer } from '../../container'
import { Role } from '../../lib/authentication'
import { UserManager } from '../../managers'
import * as middleware from '../middlewares'
import { TaskController } from './controller'
import * as validators from './validators'

export function init(server: Koa, container: ServiceContainer) {
  const router = new Router({ prefix: '/api/v1/tasks' })
  const controller = new TaskController(container.managers.task)

  router.get(
    '/:id',
    middleware.authentication(container.lib.authenticator),
    middleware.authorization([Role.user, Role.admin]),
    controller.get.bind(controller)
  )

  router.get(
    '/',
    middleware.authentication(container.lib.authenticator),
    middleware.authorization([Role.user, Role.admin]),
    controller.getAll.bind(controller)
  )

  router.post(
    '/',
    bodyParser(),
    middleware.authentication(container.lib.authenticator),
    middleware.authorization([Role.user, Role.admin]),
    middleware.validate({ request: { body: validators.createTask } }),
    controller.create.bind(controller)
  )

  router.put(
    '/:id',
    bodyParser(),
    middleware.authentication(container.lib.authenticator),
    middleware.authorization([Role.user, Role.admin]),
    middleware.validate({
      params: { id: Joi.number().required() },
      request: {
        body: validators.updateTask
      }
    }),
    controller.update.bind(controller)
  )

  router.delete(
    '/:id',
    middleware.authentication(container.lib.authenticator),
    middleware.authorization([Role.user, Role.admin]),
    middleware.validate({ params: { id: Joi.number().required() } }),
    controller.delete.bind(controller)
  )

  server.use(router.routes())
}
