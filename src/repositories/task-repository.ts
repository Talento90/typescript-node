import * as knex from 'knex'
import { Task } from '../entities'

export class TaskRepository {
  private static TABLE: string = 'tasks'
  private connection: knex

  constructor(connection: knex) {
    this.connection = connection
  }

  public async insert(task: Task): Promise<Task> {
    task.created = new Date()
    task.updated = new Date()

    const result = await this.connection.insert(task)

    task.id = result[0].insertId

    return task
  }

  public async update(task: Task): Promise<Task> {
    task.updated = new Date()

    const result = await this.connection.update({
      name: task.name,
      description: task.description,
      done: task.done
    })

    return task
  }

  public async findByUser(userId: number): Promise<Task[]> {
    const results = await this.connection
      .select()
      .from('')
      .where({ user_id: userId })

    return results.map((r: any) => this.transform(r))
  }

  public async delete(taskId: number): Promise<void> {
    await this.connection.delete().where({ id: taskId })
  }

  private transform(row: any): Task {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      userId: row.user_id,
      done: row.done,
      created: row.created,
      updated: row.updated
    }
  }
}
