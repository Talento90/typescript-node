import { AsyncResultCallback, retry } from 'async'
import knex, { Knex } from 'knex' // AI Refactor Patch: Switched to default import and added Knex type from knex 0.19.5 -> 2.x because namespace-style import and using `knex` as a type are no longer valid in knex v2.
import * as path from 'path'

export interface Configuration {
  host: string
  port: number
  user: string
  password: string
  database: string
  debug: boolean
}

export class MySql {
  private config: Configuration
  private connection: Knex | undefined // AI Refactor Patch: Updated type to Knex (from `knex`) due to knex 0.19.5 -> 2.x breaking change where types moved under the Knex interface.
  private retryDbConnectionPromise: Promise<Knex> | undefined // AI Refactor Patch: Updated type to Promise<Knex> (from Promise<`knex`>) to align with knex 2.x type definitions.

  constructor(config: Configuration) {
    this.config = config
  }

  public async getConnection(): Promise<Knex> { // AI Refactor Patch: Return type updated to Knex (from `knex`) for knex 0.19.5 -> 2.x type changes.
    if (!this.connection) {
      this.connection = await this.retryDbConnection()
    }

    return this.connection
  }

  public async getTransaction(): Promise<Knex.Transaction> { // AI Refactor Patch: Return type updated to Knex.Transaction (from `knex.Transaction`) due to knex 2.x types.
    const connection = await this.getConnection()

    return new Promise<Knex.Transaction>((resolve, reject) => { // AI Refactor Patch: Promise generic updated to Knex.Transaction to match knex 2.x types.
      try {
        connection.transaction((trx: Knex.Transaction) => { // AI Refactor Patch: Callback param typed as Knex.Transaction (from `knex.Transaction`) per knex 2.x.
          resolve(trx)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  public async closeDatabase(): Promise<void> {
    if (this.connection) {
      await this.connection.destroy()
      this.connection = undefined
    }
  }

  public async schemaMigration() {
    const connection = await this.getConnection()

    await connection.migrate.latest({
      directory: path.resolve(__dirname, './migrations')
    })
  }

  private async createConnection(): Promise<Knex> { // AI Refactor Patch: Return type updated to Knex (from `knex`) for knex 2.x.
    const config: Knex.Config = { // AI Refactor Patch: Config type updated to Knex.Config (from `knex.Config`) due to knex 0.19.5 -> 2.x type namespace changes.
      client: 'mysql2',
      connection: {
        host: this.config.host,
        port: this.config.port,
        user: this.config.user,
        password: this.config.password,
        database: this.config.database
      },
      debug: this.config.debug,
      migrations: {
        tableName: 'migrations'
      }
    }

    const db = knex(config)

    // Test database connectivity!
    await db.raw('select 1')

    return db
  }

  private retryDbConnection(): Promise<Knex> { // AI Refactor Patch: Return type updated to Promise<Knex> (from Promise<`knex`>) for knex 2.x types.
    if (this.retryDbConnectionPromise instanceof Promise) {
      return this.retryDbConnectionPromise
    }

    const methodToRetry = (cb: AsyncResultCallback<Knex, Error>) => { // AI Refactor Patch: AsyncResultCallback updated to use Knex (from `knex`) to match knex 2.x types.
      this.createConnection()
        .then((db: Knex) => { // AI Refactor Patch: Type of db updated to Knex (from `knex`) due to knex 2.x.
          cb(undefined, db)
        })
        .catch((err: Error) => {
          cb(err, undefined)
        })
    }

    this.retryDbConnectionPromise = new Promise<Knex>((resolve, reject) => { // AI Refactor Patch: Promise generic updated to Knex (from `knex`) for knex 2.x.
      retry(
        { times: 3, interval: 1000 },
        methodToRetry,
        (err: Error | undefined, db: Knex) => { // AI Refactor Patch: Callback param type updated to Knex (from `knex`) per knex 2.x types.
          if (err) {
            reject(err)
          } else {
            resolve(db)
          }

          this.retryDbConnectionPromise = undefined
        }
      )
    })

    return this.retryDbConnectionPromise
  }
}
