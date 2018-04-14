import { expect } from 'chai'
import * as supertest from 'supertest'
import { CreateUser } from '../../../../src/server/users/model'
import { truncateTables } from '../../database-utils'
import { createUserTest, getLoginToken, testServer } from '../../server-utils'

describe('POST /api/v1/users', () => {
  beforeEach(async () => {
    await truncateTables(['user'])
  })

  it('Should create a valid user and return 201', async () => {
    const user: CreateUser = {
      email: 'dummy@gmail.com',
      firstName: 'super',
      lastName: 'test',
      password: '123123123'
    }

    const res = await supertest(testServer)
      .post('/api/v1/users')
      .send(user)
      .expect(201)

    expect(res.header.location).equals('/api/v1/users/me')
    expect(res.body).includes({
      email: 'dummy@gmail.com',
      firstName: 'super',
      lastName: 'test'
    })
  })

  it('Should return 400 when duplicated email', async () => {
    const user: CreateUser = {
      email: 'dummy@gmail.com',
      firstName: 'super',
      lastName: 'test',
      password: '123123123'
    }

    let res = await supertest(testServer)
      .post('/api/v1/users')
      .send(user)
      .expect(201)

    res = await supertest(testServer)
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

    const res = await supertest(testServer)
      .post('/api/v1/users')
      .send(user)
      .expect(400)

    expect(res.body.code).equals(30001)
    expect(res.body.fields.length).equals(1)
    expect(res.body.fields[0].message).eql('"password" is required')
  })
})
