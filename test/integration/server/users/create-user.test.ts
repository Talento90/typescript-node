import { expect } from 'chai'
import * as supertest from 'supertest'
import { createServer } from '../../../../src/server'
import { CreateUser } from '../../../../src/server/users/model'

describe('Create user', () => {
  it('Should create a valid user and return 201', async () => {
    const user: CreateUser = {
      email: 'dummy@gmail.com',
      firstName: 'super',
      lastName: 'test',
      password: '123123123'
    }

    const res = await supertest(100)
      .post('/api/v1/users')
      .send(user)
      .expect(201)

    expect(res.body.email).equals('dummy@gmail.com')
    expect(res.body).keys([])
  })

  it('Should return 400 when missing body data', async () => {
    const user = {
      email: 'dummy@gmail.com',
      firstName: 'super',
      lastName: 'test'
    }

    const res = await supertest(100)
      .post('/api/v1/users')
      .send(user)
      .expect(400)

    expect(res.body.code).equals(30001)
    expect(res.body.fields).eql([])
  })
})
