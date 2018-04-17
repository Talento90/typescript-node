import { expect } from 'chai'
import * as sinon from 'sinon'
import { PermissionError } from '../../../../src/errors'
import { Role } from '../../../../src/lib/authentication'
import { authorization } from '../../../../src/server/middlewares'

describe('authorization', () => {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.restore()
  })

  it('Should pass when user contains permission access', async () => {
    const ctx: any = {
      state: {
        user: {
          role: Role.user
        }
      }
    }

    const authorizationMiddleware = authorization([Role.user, Role.admin])
    const spy = sandbox.spy()

    await authorizationMiddleware(ctx, spy)

    expect(spy.calledOnce).equals(true)
  })

  it('Should throw PermissionError when user is not allowed', async () => {
    const ctx: any = {
      state: {
        user: {
          role: Role.user
        }
      }
    }

    const authorizationMiddleware = authorization([Role.admin])
    const spy = sandbox.spy()

    try {
      await authorizationMiddleware(ctx, spy)

      expect.fail('Should throw an exception')
    } catch (error) {
      expect(error).instanceof(PermissionError)
    }

    expect(spy.calledOnce).equals(false)
  })
})
