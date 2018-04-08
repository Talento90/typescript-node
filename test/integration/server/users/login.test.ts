import { expect } from 'chai'
import * as supertest from 'supertest'

describe('Login user', () => {
  it('Should return a valid token', async () => {
    const res = await supertest(100)
      .post('/api/v1/users/login')
      .send({ email: 'dude', password: 'test' })
      .expect(200)

    expect(res.body).keys(['accessToken'])
  })

  it('Should return 400 when missing body data', async () => {
    const res = await supertest(100)
      .post('/api/v1/users/login')
      .send({ email: 'dude@mail.com' })
      .expect(400)

    expect(res.body.code).equals(30001)
    expect(res.body.fields).eql([])
  })
})
