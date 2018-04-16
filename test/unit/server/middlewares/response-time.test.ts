import { expect } from 'chai'
import * as sinon from 'sinon'
import { responseTime } from '../../../../src/server/middlewares'

describe('responseTime', () => {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.reset()
  })

  it('Should set header x-response-time', async () => {
    const ctx: any = {
      set: () => {
        return
      }
    }

    const stub = sinon.stub(ctx, 'set')

    await responseTime(ctx, () => Promise.resolve())

    expect(stub.calledOnce).equals(true)
    expect(stub.args[0][0]).equals('X-Response-Time')
  })
})
