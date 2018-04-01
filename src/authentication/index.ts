import * as jwt from 'jsonwebtoken'
import { User } from '../entities'
import { UserManager } from '../managers'

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
  authenticate(user: User)
}

export class JWTAuthenticator implements Authenticator {
  private userManager: UserManager
  private secret: string

  constructor(userManager: UserManager) {
    this.userManager = userManager
    this.secret = process.env.SECRET_KEY || 'secret'
  }

  public validate(token: string): Promise<AuthUser> {
    try {
      const decode = jwt.verify(token, this.secret)

      return Promise.resolve({
        id: 1,
        email: '',
        role: Role.user
      })
    } catch (err) {
      throw err
    }
  }

  public authenticate(user: User): string {
    return jwt.sign({ id: user.id, role: user.role }, this.secret, {
      expiresIn: 60 * 60
    })
  }
}
