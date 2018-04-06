import { Task } from '../entities'
import { TaskRepository } from '../repositories'

export class TaskManager {
  private repo: TaskRepository

  constructor(repo: TaskRepository) {
    this.repo = repo
  }

  public find(id: number): Promise<Task> {
    return this.repo.find(id)
  }

  public async findUserTasks(
    email: string,
    limit: number,
    offset: number
  ): Promise<Task[]> {
    return this.repo.findByUser(email, limit, offset)
  }

  public create(task: Task): Promise<Task> {
    return this.repo.insert(task)
  }

  public update(task: Task): Promise<Task> {
    return this.repo.update(task)
  }

  public delete(email: string, taskId: number): Promise<void> {
    return this.repo.delete(email, taskId)
  }
}
