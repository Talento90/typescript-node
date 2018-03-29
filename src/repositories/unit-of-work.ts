import * as knex from 'knex'
import { MySql } from '../database'
import { TaskRepository, UserRepository } from './index'

export class UnitOfWork {
  private db: MySql

  constructor(db: MySql) {
    this.db = db
  }

  public async getConnection(): Promise<knex> {
    return this.db.getConnection()
  }

  public async getTransaction(): Promise<knex.Transaction> {
    const connection = await this.getConnection()

    return new Promise<knex.Transaction>((resolve, reject) => {
      try {
        connection.transaction((trx: knex.Transaction) => {
          resolve(trx)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  private async withinTransaction(execute: (trx: knex.Transaction) => Promise<void>): Promise<void> {
    const trx = await this.getTransaction()

    try {
      await execute(trx)

      trx.commit()
    } catch (err) {
      trx.rollback(err)
    }
  }
}
