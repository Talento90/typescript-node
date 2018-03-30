import * as Joi from 'joi'
import * as Koa from 'koa'
import * as Router from 'koa-router'
//  import * as middleware from '../middleware'
import { ServiceContainer } from '../../container'
import { UserManager } from '../../managers'
import { UserController } from './controller'

export function init(server: Koa, container: ServiceContainer) {
  const router = new Router({ prefix: '/api/v1/users' })

  // router.use(middleware.validateSuperdataEnabled)

  const controller = new UserController(container.managers.user)

  router.post(
    '/',
    // middleware.validate({ params: { id: Joi.number() } }),
    controller.create.bind(this)
  )

  server.use(router.routes())
}
