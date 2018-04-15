import { expect } from 'chai'
import * as supertest from 'supertest'
import { shuttingDown, testServer } from '../../server-utils'

describe('GET /health', () => {
  it('Should return 200 when server is running healthy', async () => {
    const res = await supertest(testServer)
      .get('/health')
      .expect(200)

    expect(res.body.isShuttingDown).equals(false)
  })

  it('Should return 503 when server is shutting down', async () => {
    shuttingDown()

    const res = await supertest(testServer)
      .get('/health')
      .expect(503)

    expect(res.body.isShuttingDown).equals(true)
  })
})
