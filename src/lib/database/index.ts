import { AsyncResultCallback, retry } from 'async'
import knex, { Knex } from 'knex' // AI Refactor Patch: Changed import to default import with named type (knex 0.19.5 -> 2.x) because knex v2 uses a default-exported factory and types are exposed via the Knex namespace; 'import * as knex' is no longer callable and old namespace types are not available.
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
  private connection: Knex | undefined // AI Refactor Patch: Updated type from `knex` to `Knex` (knex 0.19.5 -> 2.x) because types moved under the `Knex` namespace in v2.
  private retryDbConnectionPromise: Promise<Knex> | undefined // AI Refactor Patch: Updated promise type from `Promise<knex>` to `Promise<Knex>` (knex 0.19.5 -> 2.x) to use the new `Knex` interface.

  constructor(config: Configuration) {
    this.config = config
  }

  public async getConnection(): Promise<Knex> { // AI Refactor Patch: Return type changed from `Promise<knex>` to `Promise<Knex>` (knex 0.19.5 -> 2.x) to reflect new typings.
    if (!this.connection) {
      this.connection = await this.retryDbConnection()
    }

    return this.connection
  }

  public async getTransaction(): Promise<Knex.Transaction> { // AI Refactor Patch: Return type changed from `Promise<knex.Transaction>` to `Promise<Knex.Transaction>` (knex 0.19.5 -> 2.x) due to type namespace changes.
    const connection = await this.getConnection()

    return new Promise<Knex.Transaction>((resolve, reject) => { // AI Refactor Patch: Promise generic updated from `knex.Transaction` to `Knex.Transaction` (knex 0.19.5 -> 2.x) to use new types.
      try {
        connection.transaction((trx: Knex.Transaction) => { // AI Refactor Patch: Callback param type updated from `knex.Transaction` to `Knex.Transaction` (knex 0.19.5 -> 2.x) to match new typings.
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

  private async createConnection(): Promise<Knex> { // AI Refactor Patch: Return type updated from `Promise<knex>` to `Promise<Knex>` (knex 0.19.5 -> 2.x) to use the new `Knex` interface.
    const config: Knex.Config = { // AI Refactor Patch: Config type changed from `knex.Config` to `Knex.Config` (knex 0.19.5 -> 2.x) since types are now under the `Knex` namespace.
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

    const db = knex(config) // AI Refactor Patch: Use default-exported factory `knex(config)` (knex 0.19.5 -> 2.x); previous namespace-callable import no longer works in v2.

    // Test database connectivity!
    await db.raw('select 1')

    return db
  }

  private retryDbConnection(): Promise<Knex> { // AI Refactor Patch: Return type updated from `Promise<knex>` to `Promise<Knex>` (knex 0.19.5 -> 2.x) to use the new `Knex` interface.
    if (this.retryDbConnectionPromise instanceof Promise) {
      return this.retryDbConnectionPromise
    }

    const methodToRetry = (cb: AsyncResultCallback<Knex, Error>) => { // AI Refactor Patch: Callback type updated from `AsyncResultCallback<knex, Error>` to `AsyncResultCallback<Knex, Error>` (knex 0.19.5 -> 2.x) due to type namespace changes.
      this.createConnection()
        .then((db: Knex) => { // AI Refactor Patch: Parameter type updated from `knex` to `Knex` (knex 0.19.5 -> 2.x) to match new typings.
          cb(undefined, db)
        })
        .catch((err: Error) => {
          cb(err, undefined)
        })
    }

    this.retryDbConnectionPromise = new Promise<Knex>((resolve, reject) => { // AI Refactor Patch: Promise generic updated from `knex` to `Knex` (knex 0.19.5 -> 2.x) to reflect new interface.
      retry(
        { times: 3, interval: 1000 },
        methodToRetry,
        (err: Error | undefined, db: Knex) => { // AI Refactor Patch: Callback param type updated from `knex` to `Knex` (knex 0.19.5 -> 2.x) to use new types.
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
