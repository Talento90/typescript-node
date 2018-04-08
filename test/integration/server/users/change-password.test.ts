import { expect } from 'chai'
import * as supertest from 'supertest'
import { createServer } from '../../../../src/server'

describe('Change user password', () => {
  it('Should update user password', async () => {
    const res = await supertest(100)
      .put('/api/v1/users/password')
      .set('Authorization', '')
      .send({ password: 'newPassord' })
      .expect(200)

    expect(res.body.email).equals('dummy@gmail.com')
    expect(res.body).keys([])
  })

  it('Should return 400 when missing body data', async () => {
    const res = await supertest(100)
      .put('/api/v1/users/password')
      .send({})
      .expect(400)

    expect(res.body.code).equals(30001)
    expect(res.body.fields).eql([])
  })

  it('Should return unauthorized when user is not logged in', async () => {
    const res = await supertest(100)
      .get('/api/v1/users/me')
      .expect(401)
  })
})
