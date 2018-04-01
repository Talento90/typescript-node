import * as bcrypt from 'bcrypt'

export interface Hasher {
  hashPassword(password: string): Promise<HashPassword>
  verifyPassword(password: string, hash: string): Promise<boolean>
}

export interface HashPassword {
  hash: string
  salt: string
}

class BasicHasher implements Hasher {
  public async hashPassword(password: string): Promise<HashPassword> {
    const salt = ''
    const hash = await bcrypt.hash('', salt)

    return { hash, salt }
  }

  public verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
