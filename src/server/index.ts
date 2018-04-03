import { ErrorCallback, retry } from 'async'
import { Server } from 'http'
import * as Koa from 'koa'
import * as helmet from 'koa-helmet'
import { ServiceContainer } from '../container'
import * as health from './health'
import * as user from './users'

export function createServer(container: ServiceContainer): Koa {
  const app = new Koa()

  // Register Middlewares
  app.use(helmet())

  // Register routes
  health.init(app)
  user.init(app, container)

  return app
}

export function closeServer(server: Server): Promise<void> {
  const checkPendingRequests = (callback: ErrorCallback<Error | undefined>) => {
    server.getConnections((err: Error | null, pendingRequests: number) => {
      if (err) {
        callback(err)
      } else if (pendingRequests > 0) {
        callback(Error(`Number of pending requests: ${pendingRequests}`))
      } else {
        callback(undefined)
      }
    })
  }

  return new Promise<void>((resolve, reject) => {
    retry(
      { times: 10, interval: 1000 },
      checkPendingRequests,
      (error: Error | undefined) => {
        if (error) {
          server.close(() => reject(error))
        } else {
          server.close(() => resolve())
        }
      }
    )
  })
}
