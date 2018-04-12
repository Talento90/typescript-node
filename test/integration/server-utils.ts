import * as pino from 'pino'
import * as supertest from 'supertest'
import { createContainer } from '../../src/container'
import { closeServer, createServer } from '../../src/server'
import { CreateTask, TaskModel } from '../../src/server/tasks/model'
import { CreateUser, UserModel } from '../../src/server/users/model'
import { database } from './database-utils'

const logger = pino({ name: 'test', level: 'silent' })
const container = createContainer(database, logger)
const port = process.env.PORT || 8080

export const testServer = createServer(container).listen(port)

export async function createUserTest(user: CreateUser): Promise<UserModel> {
  const res = await supertest(testServer)
    .post('/api/v1/users')
    .send(user)
    .expect(201)

  return res.body
}

export async function createTaskTest(
  task: CreateTask,
  token: string
): Promise<TaskModel> {
  const res = await supertest(testServer)
    .post('/api/v1/tasks')
    .set('Authorization', token)
    .send(task)
    .expect(201)

  return res.body
}

export async function getLoginToken(
  email: string,
  password: string
): Promise<string> {
  const res = await supertest(testServer)
    .post('/api/v1/users/login')
    .send({ email, password })
    .expect(200)

  return res.body.accessToken
}
