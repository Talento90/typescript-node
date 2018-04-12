import { expect } from 'chai'
import * as supertest from 'supertest'
import { TaskModel } from '../../../../src/server/tasks/model'
import { truncateTables } from '../../database-utils'
import {
  createTaskTest,
  createUserTest,
  getLoginToken,
  testServer
} from '../../server-utils'

describe('GET /api/v1/tasks', () => {
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

  it('Should return a list of tasks', async () => {
    const task1 = {
      name: 'Clean Room',
      description: 'Mom said that I need to clean my room.'
    }

    const task2 = {
      name: 'Do Homework',
      description: 'Math homework.'
    }

    await createTaskTest(task1, token)
    await createTaskTest(task2, token)

    const res = await supertest(testServer)
      .get('/api/v1/tasks')
      .set('Authorization', token)
      .expect(200)

    expect(res.body.length).equals(2)
    expect(res.body[0].name).equals('Clean Room')
    expect(res.body[1].name).equals('Do Homework')
  })

  it('Should return unauthorized when token is not valid', async () => {
    const res = await supertest(testServer)
      .get(`/api/v1/tasks`)
      .set('Authorization', 'wrong token')
      .expect(401)

    expect(res.body.code).equals(30002)
  })

  it('Should return unauthorized when token is missing', async () => {
    const res = await supertest(testServer)
      .get(`/api/v1/tasks`)
      .expect(401)

    expect(res.body.code).equals(30002)
  })
})
