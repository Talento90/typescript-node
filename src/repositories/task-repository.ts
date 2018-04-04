import { Task } from '../entities'
import { MySql } from '../lib/database'

export class TaskRepository {
  private readonly TABLE: string = 'task'
  private db: MySql

  constructor(db: MySql) {
    this.db = db
  }

  public async insert(task: Task): Promise<Task> {
    task.created = new Date()
    task.updated = new Date()

    const conn = await this.db.getConnection()
    const result = await conn.table(this.TABLE).insert(task)

    task.id = result[0].insertId

    return task
  }

  public async update(task: Task): Promise<Task> {
    task.updated = new Date()

    const conn = await this.db.getConnection()
    const result = await conn.table(this.TABLE).update({
      name: task.name,
      description: task.description,
      done: task.done
    })

    return task
  }

  public async findByUser(userId: number): Promise<Task[]> {
    const conn = await this.db.getConnection()
    const results = await conn
      .select()
      .from(this.TABLE)
      .where({ user_id: userId })

    return results.map((r: any) => this.transform(r))
  }

  public async delete(taskId: number): Promise<void> {
    const conn = await this.db.getConnection()

    await conn
      .from(this.TABLE)
      .delete()
      .where({ id: taskId })
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
