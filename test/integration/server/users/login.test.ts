import { expect } from 'chai'
import * as supertest from 'supertest'
import { truncateTables } from '../../database-utils'
import { createUserTest, testServer } from '../../server-utils'

describe('POST /api/v1/users/login', () => {
  beforeEach(async () => {
    await truncateTables(['user'])

    const user = {
      email: 'dude@gmail.com',
      firstName: 'super',
      lastName: 'test',
      password: 'test'
    }

    await createUserTest(user)
  })

  it('Should return a valid token', async () => {
    const res = await supertest(testServer)
      .post('/api/v1/users/login')
      .send({ email: 'dude@gmail.com', password: 'test' })
      .expect(200)

    expect(res.body).keys(['accessToken'])
  })

  it('Should return 400 when missing password', async () => {
    const res = await supertest(testServer)
      .post('/api/v1/users/login')
      .send({ email: 'dude@mail.com' })
      .expect(400)

    expect(res.body.code).equals(30001)
    expect(res.body.fields.length).equals(1)
    expect(res.body.fields[0].message).eql('"password" is required')
  })
})
