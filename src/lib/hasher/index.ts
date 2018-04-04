import * as bcrypt from 'bcryptjs'

export interface Hasher {
  hashPassword(password: string): Promise<string>
  verifyPassword(password: string, hash: string): Promise<boolean>
}

export class BCryptHasher implements Hasher {
  public async hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10)

    return bcrypt.hash(password, salt)
  }

  public verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
