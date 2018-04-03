import { Logger } from 'pino'
import { Authenticator, JWTAuthenticator } from './lib/authentication'
import { MySql } from './lib/database'
import { BCryptHasher, Hasher } from './lib/hasher'
import { TaskManager, UserManager } from './managers'
import { TaskRepository, UserRepository } from './repositories'

export interface ServiceContainer {
  logger: Logger
  lib: {
    hasher: Hasher
    authenticator: Authenticator
  }
  repositories: {
    task: TaskRepository
    user: UserRepository
  }
  managers: {
    task: TaskManager
    user: UserManager
  }
}

export function createContainer(db: MySql, logger: Logger): ServiceContainer {
  const taskRepo = new TaskRepository(db)
  const userRepo = new UserRepository(db)
  const hasher = new BCryptHasher()

  return {
    logger,
    lib: {
      hasher,
      authenticator: new JWTAuthenticator(userRepo)
    },
    repositories: {
      task: taskRepo,
      user: userRepo
    },
    managers: {
      task: new TaskManager(taskRepo),
      user: new UserManager(userRepo, hasher)
    }
  }
}
