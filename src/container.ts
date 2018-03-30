import { MySql } from './database'
import { TaskManager, UserManager } from './managers'
import { TaskRepository, UserRepository } from './repositories'

export interface ServiceContainer {
  repositories: {
    task: TaskRepository
    user: UserRepository
  }
  managers: {
    task: TaskManager
    user: UserManager
  }
}

export function createContainer(db: MySql): ServiceContainer {
  const taskRepo = new TaskRepository(db)
  const userRepo = new UserRepository(db)

  return {
    repositories: {
      task: taskRepo,
      user: userRepo
    },
    managers: {
      task: new TaskManager(taskRepo),
      user: new UserManager(userRepo)
    }
  }
}
