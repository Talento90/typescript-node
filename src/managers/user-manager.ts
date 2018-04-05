import { User } from '../entities'
import { Authenticator } from '../lib/authentication'
import { Hasher } from '../lib/hasher'
import { UserRepository } from '../repositories'

export class UserManager {
  private repo: UserRepository
  private hasher: Hasher
  private auth: Authenticator

  constructor(repo: UserRepository, hasher: Hasher, auth: Authenticator) {
    this.repo = repo
    this.hasher = hasher
    this.auth = auth
  }

  public async create(user: User): Promise<User> {
    const hashPassword = await this.hasher.hashPassword(user.password)

    user.password = hashPassword

    return this.repo.insert(user)
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.repo.find(email)

    if (this.hasher.verifyPassword(password, user.password)) {
      return this.auth.authenticate(user)
    }

    throw new Error('Wrong credentials')
  }

  public update(user: User): Promise<User> {
    return this.repo.update(user)
  }

  public async changePassword(
    email: string,
    newPassword: string
  ): Promise<void> {
    const hashPassword = await this.hasher.hashPassword(newPassword)

    return this.repo.changePassword(email, newPassword)
  }

  public async findByEmail(email: string): Promise<User> {
    return this.repo.find(email)
  }
}
