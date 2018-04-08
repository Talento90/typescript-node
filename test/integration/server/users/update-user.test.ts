import { expect } from 'chai'
import * as supertest from 'supertest'

describe('Update user information', () => {
  it('Should update first and last name', async () => {
    const res = await supertest(100)
      .put('/api/v1/users')
      .set('Authorization', '')
      .send({ firstName: 'dude', lastName: 'test' })
      .expect(200)

    expect(res.body).eql([])
  })

  it('Should return 400 when missing body data', async () => {
    const res = await supertest(100)
      .put('/api/v1/users/password')
      .send({ firstName: 'dude' })
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
