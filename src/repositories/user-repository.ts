import { User } from '../entities'
import { MySql } from '../lib/database'

export class UserRepository {
  private readonly TABLE: string = 'USER'
  private db: MySql

  constructor(db: MySql) {
    this.db = db
  }

  public async insert(user: User): Promise<User> {
    user.created = new Date()
    user.updated = new Date()

    const conn = await this.db.getConnection()
    const result = await conn.table(this.TABLE).insert(user)

    user.id = result[0].insertId

    return user
  }

  public async update(user: User): Promise<User> {
    user.updated = new Date()

    const conn = await this.db.getConnection()
    const result = await conn.table(this.TABLE).update({
      first_name: user.firstName,
      last_name: user.lastName
    })

    return user
  }

  public async find(email: string): Promise<User> {
    const conn = await this.db.getConnection()
    const result = await conn.table(this.TABLE).first({ email })

    return this.transform(result)
  }

  private transform(row: any): User {
    return {
      id: row.id,
      email: row.email,
      password: row.password,
      salt: row.salt,
      role: row.role,
      firstName: row.first_name,
      lastName: row.last_name,
      created: row.created,
      updated: row.updated
    }
  }
}
