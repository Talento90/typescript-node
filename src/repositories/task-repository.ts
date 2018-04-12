import { Task } from '../entities'
import { NotFoundError } from '../errors'
import { MySql } from '../lib/database'

export class TaskRepository {
  private readonly TABLE: string = 'task'
  private db: MySql

  constructor(db: MySql) {
    this.db = db
  }

  public async find(userId: number, id: number): Promise<Task> {
    const conn = await this.db.getConnection()
    const row = await conn
      .select()
      .from(this.TABLE)
      .where({ id, user_id: userId })
      .first()

    if (!row) {
      throw new NotFoundError('Task does not exist')
    }

    return this.transform(row)
  }

  public async findByUser(
    userId: number,
    limit: number,
    offset: number
  ): Promise<Task[]> {
    const conn = await this.db.getConnection()
    const results = await conn
      .select()
      .from(this.TABLE)
      .where({ user_id: userId })
      .orderBy('updated', 'DESC')
      .offset(offset)
      .limit(limit)

    return results.map((r: any) => this.transform(r))
  }

  public async insert(task: Task): Promise<Task> {
    task.created = new Date()
    task.updated = new Date()

    const conn = await this.db.getConnection()
    const result = await conn.table(this.TABLE).insert({
      name: task.name,
      description: task.description,
      done: task.done,
      created: task.created,
      updated: task.updated,
      user_id: task.userId
    })

    task.id = result[0]

    return task
  }

  public async update(task: Task): Promise<Task> {
    task.updated = new Date()

    const conn = await this.db.getConnection()
    const result = await conn
      .table(this.TABLE)
      .update({
        name: task.name,
        description: task.description,
        done: task.done
      })
      .where({ user_id: task.userId, id: task.id })

    return task
  }

  public async delete(userId: number, taskId: number): Promise<void> {
    const conn = await this.db.getConnection()

    const result = await conn
      .from(this.TABLE)
      .delete()
      .where({ id: taskId, user_id: userId })

    if (result === 0) {
      throw new NotFoundError('Task does not exist')
    }
  }

  private transform(row: any): Task {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      userId: row.user_id,
      done: row.done === 1,
      created: row.created,
      updated: row.updated
    }
  }
}
