import { expect } from 'chai'
import * as supertest from 'supertest'
import { createServer } from '../../../../src/server'
import { CreateUser } from '../../../../src/server/users/model'
import { SERVER_URL } from '../../test-utils'

describe('POST /api/v1/users', () => {
  it('Should create a valid user and return 201', async () => {
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
    expect(res.body.firstName).equals('super')
    expect(res.body.lastName).equals('test')
    expect(res.body).keys([
      'id',
      'email',
      'firstName',
      'lastName',
      'created',
      'updated'
    ])
  })

  it('Should return 400 when duplicated email', async () => {
    const user: CreateUser = {
      email: 'dummy@gmail.com',
      firstName: 'super',
      lastName: 'test',
      password: '123123123'
    }

    const res = await supertest(SERVER_URL)
      .post('/api/v1/users')
      .send(user)
      .expect(400)

    expect(res.body).eql({
      code: 30000,
      message: 'Email dummy@gmail.com already exists'
    })
  })

  it('Should return 400 when missing fields', async () => {
    const user = {
      email: 'dummy1@gmail.com',
      firstName: 'super',
      lastName: 'test'
    }

    const res = await supertest(SERVER_URL)
      .post('/api/v1/users')
      .send(user)
      .expect(400)

    expect(res.body.code).equals(30001)
    expect(res.body.fields.length).equals(1)
    expect(res.body.fields[0].message).eql('"password" is required')
  })
})
