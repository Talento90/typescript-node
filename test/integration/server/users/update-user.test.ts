import { expect } from 'chai'
import * as supertest from 'supertest'
import { truncateTables } from '../../database-utils'
import { createUserTest, getLoginToken, testServer } from '../../server-utils'

describe('PUT /api/v1/users', () => {
  let token: string

  beforeEach(async () => {
    await truncateTables(['user'])

    const user = {
      email: 'dude@gmail.com',
      firstName: 'super',
      lastName: 'mocha',
      password: 'test'
    }

    await createUserTest(user)

    token = await getLoginToken('dude@gmail.com', 'test')
  })

  it('Should update first and last name', async () => {
    const res = await supertest(testServer)
      .put('/api/v1/users')
      .set('Authorization', token)
      .send({ firstName: 'dude', lastName: 'test' })
      .expect(200)

    expect(res.body).include({
      firstName: 'dude',
      lastName: 'test'
    })
  })

  it('Should return 400 when missing lastName data', async () => {
    const res = await supertest(testServer)
      .put('/api/v1/users')
      .set('Authorization', token)
      .send({ firstName: 'dude' })
      .expect(400)

    expect(res.body.code).equals(30001)
    expect(res.body.fields.length).equals(1)
    expect(res.body.fields[0].message).eql('"lastName" is required')
  })

  it('Should return unauthorized when token is not valid', async () => {
    const res = await supertest(testServer)
      .put('/api/v1/users')
      .set('Authorization', 'wrong token')
      .expect(401)

    expect(res.body.code).equals(30002)
  })

  it('Should return unauthorized when token is missing', async () => {
    const res = await supertest(testServer)
      .put('/api/v1/users')
      .expect(401)

    expect(res.body.code).equals(30002)
  })
})
