import { expect } from 'chai'
import * as supertest from 'supertest'
import { truncateTables } from '../../database-utils'
import { createUserTest, getLoginToken, testServer } from '../../server-utils'

describe('POST /api/v1/tasks', () => {
  let token: string

  before(async () => {
    await truncateTables(['task', 'user'])

    const user = {
      email: 'dude@gmail.com',
      firstName: 'super',
      lastName: 'mocha',
      password: 'secret'
    }

    await createUserTest(user)
    token = await getLoginToken('dude@gmail.com', 'secret')
  })

  it('Should create a task and return 201', async () => {
    const task = {
      name: 'Do homework',
      description: 'Exercise 1 and 2'
    }

    const res = await supertest(testServer)
      .post('/api/v1/tasks')
      .set('Authorization', token)
      .send(task)
      .expect(201)

    expect(res.header.location).equals(`/api/v1/tasks/${res.body.id}`)
    expect(res.body).include({
      name: 'Do homework',
      description: 'Exercise 1 and 2',
      done: false
    })
  })

  it('Should return 400 when missing body data', async () => {
    const task = {
      name: 'Do something'
    }

    const res = await supertest(testServer)
      .post('/api/v1/tasks')
      .set('Authorization', token)
      .send(task)
      .expect(400)

    expect(res.body.code).equals(30001)
    expect(res.body.fields.length).equals(1)
    expect(res.body.fields[0].message).eql('"description" is required')
  })

  it('Should return unauthorized when token is not valid', async () => {
    const res = await supertest(testServer)
      .post('/api/v1/tasks')
      .set('Authorization', 'wrong token')
      .expect(401)

    expect(res.body.code).equals(30002)
  })

  it('Should return unauthorized when token is missing', async () => {
    const res = await supertest(testServer)
      .post('/api/v1/tasks')
      .expect(401)

    expect(res.body.code).equals(30002)
  })
})
