import { expect } from 'chai'
import * as sinon from 'sinon'
import { responseTime } from '../../../../src/server/middlewares'

describe('responseTime', () => {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.restore()
  })

  it('Should set header x-response-time', async () => {
    const ctx: any = {
      set: () => {
        return
      }
    }

    const spy = sinon.spy(ctx, 'set')

    await responseTime(ctx, () => Promise.resolve())

    expect(spy.calledOnce).equals(true)
    expect(spy.args[0][0]).equals('X-Response-Time')
  })
})
