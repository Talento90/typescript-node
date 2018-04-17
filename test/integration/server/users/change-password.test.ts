import { expect } from 'chai'
import * as supertest from 'supertest'
import { truncateTables } from '../../database-utils'
import { createUserTest, getLoginToken, testServer } from '../../server-utils'

describe('PUT /api/v1/users/password', () => {
  let token: string

  beforeEach(async () => {
    await truncateTables(['user'])

    const user = {
      email: 'dude@gmail.com',
      firstName: 'super',
      lastName: 'mocha',
      password: 'secret'
    }

    await createUserTest(user)
    token = await getLoginToken('dude@gmail.com', 'secret')
  })

  it('Should update user password and login successfully', async () => {
    let res = await supertest(testServer)
      .put('/api/v1/users/password')
      .set('Authorization', token)
      .send({ newPassword: 'newPassord', oldPassword: 'secret' })
      .expect(204)

    res = await supertest(testServer)
      .post('/api/v1/users/login')
      .send({ email: 'dude@gmail.com', password: 'newPassord' })
      .expect(200)

    expect(res.body).keys(['accessToken'])
  })

  it('Should update user password but fail on login', async () => {
    let res = await supertest(testServer)
      .put('/api/v1/users/password')
      .set('Authorization', token)
      .send({ newPassword: 'newPassord', oldPassword: 'secret' })
      .expect(204)

    res = await supertest(testServer)
      .post('/api/v1/users/login')
      .send({ email: 'dude@gmail.com', password: 'secret' })
      .expect(400)

    expect(res.body.code).equals(30000)
  })

  it('Should return 400 when missing body data', async () => {
    const res = await supertest(testServer)
      .put('/api/v1/users/password')
      .set('Authorization', token)
      .send({ newPassword: 'newPassord' })
      .expect(400)

    expect(res.body.code).equals(30001)
    expect(res.body.fields.length).equals(1)
    expect(res.body.fields[0].message).eql('"oldPassword" is required')
  })

  it('Should return unauthorized when token is not valid', async () => {
    const res = await supertest(testServer)
      .put('/api/v1/users/password')
      .set('Authorization', 'wrong token')
      .expect(401)

    expect(res.body.code).equals(30002)
  })

  it('Should return unauthorized when token is missing', async () => {
    const res = await supertest(testServer)
      .put('/api/v1/users/password')
      .expect(401)

    expect(res.body.code).equals(30002)
  })
})
