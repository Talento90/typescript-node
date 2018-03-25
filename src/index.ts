import { Server } from 'http'
import * as pino from 'pino'
import { MySql } from './database'
import * as server from './server'

export async function init() {
  const logger = pino()

  try {
    // Starting the HTTP server
    logger.info('Starting HTTP server')

    const app = server.createServer().listen(process.env.PORT || 8080)

    // Register global process events
    registerProcessEvents(logger, app)
  } catch (e) {
    logger.error(e, 'An error occurred while initializing application.')
  }
}

function registerProcessEvents(logger: pino.Logger, app: Server) {
  process.on('uncaughtException', (error: Error) => {
    logger.error('UncaughtException', error)
  })

  process.on('unhandledRejection', (reason: any, promise: any) => {
    logger.info(reason, promise)
  })

  process.on('SIGTERM', () => {
    logger.info('Starting graceful shutdown')

    app.close()
  })
}

init()
