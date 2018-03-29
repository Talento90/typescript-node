import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as helmet from 'koa-helmet'
import * as health from './health'
import * as user from './users'

export function createServer(): Koa {
  const app = new Koa()

  // Register Middlewares
  app.use(helmet())
  app.use(bodyParser())

  // Register routes
  health.init(app)
  user.init(app, null)

  return app
}
