import * as jwt from 'jsonwebtoken'
import { User } from '../../entities'
import { UnauthorizedError } from '../../errors'
import { UserRepository } from '../../repositories'

export interface AuthUser {
  id: number
  email: string
  role: Role
}

export enum Role {
  user = 'user',
  admin = 'admin'
}

export interface Authenticator {
  validate(token: string): Promise<AuthUser>
  authenticate(user: User): string
}

export class JWTAuthenticator implements Authenticator {
  private userRepo: UserRepository
  private secret: string

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo
    this.secret = process.env.SECRET_KEY || 'secret'
  }

  public async validate(token: string): Promise<AuthUser> {
    try {
      const decode: any = jwt.verify(token, this.secret)
      const user = await this.userRepo.find(decode.email)

      return {
        id: user.id,
        email: user.email,
        role: user.role as Role
      }
    } catch (err) {
      throw new UnauthorizedError(err)
    }
  }

  public authenticate(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.secret,
      {
        expiresIn: 60 * 60
      }
    )
  }
}
