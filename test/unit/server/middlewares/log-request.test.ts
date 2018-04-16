import { expect } from 'chai'
import * as pino from 'pino'
import * as sinon from 'sinon'
import { logRequest } from '../../../../src/server/middlewares'

describe('logRequest', () => {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.reset()
  })

  it('Should log info level when no errors', async () => {
    const ctx: any = {}
    const logger = pino({ name: 'test', level: 'silent' })
    const spy = sinon.spy(logger, 'info')
    const logMiddleware = logRequest(logger)

    await logMiddleware(ctx, () => Promise.resolve())

    expect(spy.calledOnce).equals(true)
    expect(spy.args[0].length).equals(2)
  })

  it('Should log error level when status code is >= 400', async () => {
    const ctx: any = { status: 500 }
    const logger = pino({ name: 'test', level: 'silent' })
    const spy = sinon.spy(logger, 'error')
    const logMiddleware = logRequest(logger)

    await logMiddleware(ctx, () => Promise.resolve())

    expect(spy.calledOnce).equals(true)
    expect(spy.args[0].length).equals(3)
  })
})
