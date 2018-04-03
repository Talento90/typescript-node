import * as bcrypt from 'bcryptjs'

export interface Hasher {
  hashPassword(password: string): Promise<HashPassword>
  verifyPassword(password: string, hash: string): Promise<boolean>
}

export interface HashPassword {
  hash: string
  salt: string
}

export class BCryptHasher implements Hasher {
  public async hashPassword(password: string): Promise<HashPassword> {
    const salt = ''
    const hash = await bcrypt.hash(password, salt)

    return { hash, salt }
  }

  public verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
