import { closeServer } from '../../src/server'
import { database } from './database-utils'
import { testServer } from './server-utils'

before(async () => {
  console.info('Initializing database migration.')
  await database.schemaMigration()
})

after(async () => {
  const shutdowns = [closeServer(testServer), database.closeDatabase()]

  console.info('Start cleaning test resources.')

  for (const shutdown of shutdowns) {
    try {
      await shutdown
    } catch (e) {
      console.error('Error in graceful shutdown ', e)
    }
  }
})
