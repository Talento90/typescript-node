import { expect } from 'chai'
import * as supertest from 'supertest'
import { createServer } from '../../../../src/server'

describe('Create user', () => {
  it('Should return user information', async () => {
    const res = await supertest(100)
      .get('/api/v1/users/me')
      .set('Authorization', '')
      .expect(200)

    expect(res.body.email).eql({})
  })

  it('Should return unauthorized when user is not logged in', async () => {
    const res = await supertest(100)
      .get('/api/v1/users/me')
      .expect(401)
  })
})
