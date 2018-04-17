import * as pino from 'pino'
import { createContainer } from './container'
import { MySql } from './lib/database'
import { HealthMonitor } from './lib/health'
import { AppServer, createServer } from './server'

export async function init() {
  const logger = pino()

  try {
    // Starting the HTTP server
    logger.info('Starting HTTP server')

    const db = new MySql({
      database: 'task_manager',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      debug: process.env.ENV !== 'production'
    })

    logger.info('Apply database migration')
    await db.schemaMigration()

    const port = Number(process.env.PORT) || 8080
    const container = createContainer(db, logger)
    const app = createServer(container)
    const health = container.health

    app.listen(port)

    // Register global process events and graceful shutdown
    registerProcessEvents(logger, app, db, health)

    logger.info(`Application running on port: ${port}`)
  } catch (e) {
    logger.error(e, 'An error occurred while initializing application.')
  }
}

function registerProcessEvents(
  logger: pino.Logger,
  app: AppServer,
  db: MySql,
  health: HealthMonitor
) {
  process.on('uncaughtException', (error: Error) => {
    logger.error('UncaughtException', error)
  })

  process.on('unhandledRejection', (reason: any, promise: any) => {
    logger.info(reason, promise)
  })

  process.on('SIGTERM', async () => {
    logger.info('Starting graceful shutdown')

    health.shuttingDown()

    let exitCode = 0
    const shutdown = [app.closeServer(), db.closeDatabase()]

    for (const s of shutdown) {
      try {
        await s
      } catch (e) {
        logger.error('Error in graceful shutdown ', e)
        exitCode = 1
      }
    }

    process.exit(exitCode)
  })
}

init()
