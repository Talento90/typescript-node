import { expect } from 'chai'
import * as supertest from 'supertest'
import { truncateTables } from '../../database-utils'
import { createUserTest, getLoginToken, testServer } from '../../server-utils'

describe('GET /api/v1/users/me', () => {
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

  it('Should return user information', async () => {
    const token = await getLoginToken('dude@gmail.com', 'test')
    const res = await supertest(testServer)
      .get('/api/v1/users/me')
      .set('Authorization', token)
      .expect(200)

    expect(res.body).keys([
      'id',
      'email',
      'firstName',
      'lastName',
      'created',
      'updated'
    ])
  })

  it('Should return unauthorized when token is not valid', async () => {
    const res = await supertest(testServer)
      .get('/api/v1/users/me')
      .set('Authorization', 'wrong token')
      .expect(401)

    expect(res.body.code).equals(30002)
  })

  it('Should return unauthorized when token is missing', async () => {
    const res = await supertest(testServer)
      .get('/api/v1/users/me')
      .expect(401)

    expect(res.body.code).equals(30002)
  })
})
