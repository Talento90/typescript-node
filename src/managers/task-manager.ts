import { Task } from '../entities'
import { TaskRepository } from '../repositories'

export class TaskManager {
  private repo: TaskRepository

  constructor(repo: TaskRepository) {
    this.repo = repo
  }

  public insert(task: Task): Promise<Task> {
    return this.repo.insert(task)
  }

  public update(task: Task): Promise<Task> {
    return this.repo.update(task)
  }

  public delete(taskId: number): Promise<void> {
    return this.repo.delete(taskId)
  }

  public async findUserTasks(userId: number): Promise<Task[]> {
    return this.repo.findByUser(userId)
  }
}
