import { expect } from 'chai'
import * as supertest from 'supertest'
import { createServer } from '../../../../src/server'
import { CreateUser } from '../../../../src/server/users/model'
import { SERVER_URL } from '../../test-utils'

describe('Create user', () => {
  it.only('Should create a valid user and return 201', async () => {
    const user: CreateUser = {
      email: 'dummy@gmail.com',
      firstName: 'super',
      lastName: 'test',
      password: '123123123'
    }

    const res = await supertest(SERVER_URL)
      .post('/api/v1/users')
      .send(user)
      .expect(201)

    expect(res.body.email).equals('dummy@gmail.com')
    expect(res.body).eql({
      id: 1,
      email: '',
      firstName: '',
      lastName: '',
      created: '',
      updated: ''
    })
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
