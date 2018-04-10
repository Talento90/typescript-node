import { expect } from 'chai'
import * as supertest from 'supertest'
import { TaskModel } from '../../../../src/server/tasks/model'

describe('Create user', () => {
  it('Should create a task and return 201', async () => {
    const task = {
      name: 'dummy@gmail.com',
      description: 'super',
      done: false
    }

    const res = await supertest(100)
      .post('/api/v1/tasks')
      .send(task)
      .expect(201)

    expect(res.body).equals('dummy@gmail.com')
    expect(res.body).keys([])
  })

  it('Should return 400 when missing body data', async () => {
    const task = {
      name: 'dummy@gmail.com'
    }

    const res = await supertest(100)
      .post('/api/v1/tasks')
      .send(task)
      .expect(400)

    expect(res.body.code).equals(30001)
    expect(res.body.fields).eql([])
  })

  it('Should return unauthorized when user is not logged in', async () => {
    const res = await supertest(100)
      .post('/api/v1/tasks')
      .expect(401)
  })
})
