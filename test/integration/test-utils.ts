import * as supertest from 'supertest'
import { CreateUser, UserModel } from '../../src/server/users/model'

export const SERVER_URL = `localhost:${process.env.PORT || 8080}`

export async function createUserTest(user: CreateUser): Promise<UserModel> {
  const res = await supertest(SERVER_URL)
    .post('/api/v1/users')
    .send(user)
    .expect(201)

  return res.body
}

export async function getLoginToken(
  email: string,
  password: string
): Promise<string> {
  const res = await supertest(SERVER_URL)
    .post('/api/v1/users/login')
    .send({ email, password })
    .expect(200)

  return res.body.accessToken
}
