import * as Koa from 'koa'
import * as pino from 'pino'
import { ServiceContainer } from '../../src/container'
import { Authenticator, JWTAuthenticator } from '../../src/lib/authentication'
import { Configuration, MySql } from '../../src/lib/database'
import { BCryptHasher, Hasher } from '../../src/lib/hasher'
import { TaskManager, UserManager } from '../../src/managers'
import { TaskRepository, UserRepository } from '../../src/repositories'
import { closeServer, createServer } from '../../src/server'

const mysqlConfig: Configuration = {
  database: 'task-manager',
  host: 'mysql',
  port: 3306,
  user: 'root',
  password: 'secret',
  debug: true
}

function createTestServer(logger: pino.Logger, db: MySql): Koa {
  const taskRepo = new TaskRepository(db)
  const userRepo = new UserRepository(db)
  const hasher = new BCryptHasher()
  const authenticator = new JWTAuthenticator(userRepo)

  const container: ServiceContainer = {
    logger,
    lib: {
      hasher,
      authenticator
    },
    repositories: {
      task: taskRepo,
      user: userRepo
    },
    managers: {
      task: new TaskManager(taskRepo),
      user: new UserManager(userRepo, hasher, authenticator)
    }
  }

  return createServer(container)
}

const log = pino({ name: 'test' })
const database: MySql = new MySql(mysqlConfig)
const testServer = createTestServer(log, database).listen(1999)

process.on('exit', async () => {
  const shutdown = [closeServer(testServer), database.closeDatabase()]

  for (const s of shutdown) {
    try {
      await s
    } catch (e) {
      log.error('Error in graceful shutdown ', e)
    }
  }
})
