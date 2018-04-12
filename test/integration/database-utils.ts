import { Configuration, MySql } from '../../src/lib/database'

const testMysqlConfig: Configuration = {
  database: 'task_manager',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  debug: false
}

export const database: MySql = new MySql(testMysqlConfig)

export async function truncateTables(tables: string[]) {
  const conn = await database.getConnection()

  for (const table of tables) {
    await conn.raw(`DELETE FROM ${table}`)
  }
}
