import { expect } from 'chai'
import * as supertest from 'supertest'
import { truncateTables } from '../../database-utils'
import {
  createTaskTest,
  createUserTest,
  getLoginToken,
  testServer
} from '../../server-utils'

describe('DELETE /api/v1/tasks/:id', () => {
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

  it('Should delete a task and return 204', async () => {
    const task = {
      name: 'Do Something',
      description: 'Some random description'
    }

    const createdTask = await createTaskTest(task, token)

    await supertest(testServer)
      .delete(`/api/v1/tasks/${createdTask.id}`)
      .set('Authorization', token)
      .expect(204)

    await supertest(testServer)
      .get(`/api/v1/tasks/${createdTask.id}`)
      .set('Authorization', token)
      .expect(404)
  })

  it('Should return 404 when task does not exist', async () => {
    await supertest(testServer)
      .delete(`/api/v1/tasks/1000000`)
      .set('Authorization', token)
      .expect(404)
  })

  it('Should return unauthorized when token is not valid', async () => {
    const res = await supertest(testServer)
      .delete(`/api/v1/tasks/1000000`)
      .set('Authorization', 'wrong token')
      .expect(401)

    expect(res.body.code).equals(30002)
  })

  it('Should return unauthorized when token is missing', async () => {
    const res = await supertest(testServer)
      .delete(`/api/v1/tasks/1000000`)
      .expect(401)

    expect(res.body.code).equals(30002)
  })
})
