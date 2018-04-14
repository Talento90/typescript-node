import * as Koa from 'koa'
import * as Router from 'koa-router'
import { ServiceContainer } from '../../container'
import HealthController from './controller'

export function init(server: Koa, container: ServiceContainer) {
  const controller = new HealthController(container.health)
  const router = new Router()

  router.get('/health', controller.getHealth.bind(controller))

  server.use(router.routes())
}
