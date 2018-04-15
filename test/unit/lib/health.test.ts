import { expect } from 'chai'
import { HealthMonitor } from '../../../src/lib/health'

describe('HealthMonitor#getStatus', () => {
  it('Should return isShuttingDown true', async () => {
    const health = new HealthMonitor()
    let status = health.getStatus()

    expect(status.isShuttingDown).equals(false)

    health.shuttingDown()

    status = health.getStatus()

    expect(status.isShuttingDown).equals(true)
  })
})
