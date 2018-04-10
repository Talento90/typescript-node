import { expect } from 'chai'
import * as supertest from 'supertest'
import { createUserTest, getLoginToken, SERVER_URL } from '../../test-utils'

describe('PUT /api/v1/users', () => {
  before(async () => {
    const user = {
      email: 'dude@gmail.com',
      firstName: 'super',
      lastName: 'mocha',
      password: 'test'
    }

    await createUserTest(user)
  })

  it('Should update first and last name', async () => {
    const token = await getLoginToken('dude@gmail.com', 'test')
    let res = await supertest(SERVER_URL)
      .put('/api/v1/users')
      .set('Authorization', token)
      .send({ firstName: 'dude', lastName: 'test' })
      .expect(200)

    res = await supertest(SERVER_URL)
      .get('/api/v1/users/me')
      .set('Authorization', token)
      .expect(200)

    expect(res.body.firstName).equals('dude')
    expect(res.body.lastName).equals('test')

    expect(res.body).include({
      firstName: 'dude',
      lastName: 'test'
    })
  })

  it('Should return 400 when missing lastName data', async () => {
    const res = await supertest(SERVER_URL)
      .put('/api/v1/users/password')
      .set('Authorization', '')
      .send({ firstName: 'dude' })
      .expect(400)

    expect(res.body.code).equals(30001)
    expect(res.body.fields.length).equals(1)
    expect(res.body.fields[0].message).eql('"lastName" is required')
  })

  it('Should return unauthorized when token is not valid', async () => {
    const res = await supertest(SERVER_URL)
      .put('/api/v1/users/password')
      .set('Authorization', 'wrong token')
      .expect(401)

    expect(res.body.code).equals(30002)
  })

  it('Should return unauthorized when token is missing', async () => {
    const res = await supertest(SERVER_URL)
      .put('/api/v1/users/password')
      .expect(401)

    expect(res.body.code).equals(30002)
  })
})
