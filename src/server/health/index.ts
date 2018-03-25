import * as Koa from 'koa'
import * as Router from 'koa-router'
import HealthController from './controller'

export function init(server: Koa) {
  const controller = new HealthController()
  const router = new Router()

  router.get('/health', controller.getHealth.bind(this))

  server.use(router.routes())
}
