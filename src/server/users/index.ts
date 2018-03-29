import * as Joi from 'joi'
import * as Koa from 'koa'
import * as Router from 'koa-router'
//  import * as middleware from '../middleware'
import { UserManager } from '../../managers'
import { UserController } from './controller'

export function init(server: Koa, userManager: UserManager) {
  const router = new Router({ prefix: '/api/v1/users' })

  // router.use(middleware.validateSuperdataEnabled)

  const controller = new UserController(userManager)

  router.post(
    '/',
    // middleware.validate({ params: { id: Joi.number() } }),
    controller.createUser.bind(this)
  )

  server.use(router.routes())
}
