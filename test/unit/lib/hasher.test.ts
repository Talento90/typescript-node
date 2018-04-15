import { expect } from 'chai'
import { BCryptHasher } from '../../../src/lib/hasher'

describe('BCryptHasher', () => {
  it('Should return validate password', async () => {
    const hasher = new BCryptHasher()
    const hashedPassword = await hasher.hashPassword('password')

    const verify = await hasher.verifyPassword('password', hashedPassword)

    expect(verify).equals(true)
  })

  it('Should return false when password is not valid', async () => {
    const hasher = new BCryptHasher()
    const hashedPassword = await hasher.hashPassword('password')

    const verify = await hasher.verifyPassword('password123', hashedPassword)

    expect(verify).equals(false)
  })
})
