import * as knex from 'knex'
import { User } from '../entities'

export class UserRepository {
  private connection: knex
  private readonly TABLE: string = 'USER'

  constructor(connection: knex) {
    this.connection = connection
  }

  public async insert(user: User): Promise<User> {
    user.created = new Date()
    user.updated = new Date()

    const result = await this.connection.insert(user)

    user.id = result[0].insertId

    return user
  }

  public async update(user: User): Promise<User> {
    user.updated = new Date()

    const result = await this.connection.update({
      first_name: user.firstName,
      last_name: user.lastName
    })

    return user
  }

  public async find(email: string): Promise<User> {
    const result = await this.connection.table(this.TABLE).first({ email })

    return this.transform(result)
  }

  private transform(row: any): User {
    return {
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      created: row.created,
      updated: row.updated
    }
  }
}
