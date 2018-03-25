import * as knex from 'knex'
import { User } from '../entities'

export class UserRepository {
  private connection: knex

  constructor(conn: knex) {
    this.connection = conn
  }

  public async insert(user: User): Promise<User> {
    const inserted = await this.connection.insert({})

    user.id = inserted

    return user
  }
}
