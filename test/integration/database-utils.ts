import { Role } from '../../src/lib/authentication'
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

export async function setAdminMode(email: string): Promise<void> {
  const conn = await database.getConnection()

  await conn
    .table('user')
    .update({
      role: Role.admin
    })
    .where({ email })
}
