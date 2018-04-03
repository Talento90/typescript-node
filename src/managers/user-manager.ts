import { User } from '../entities'
import { Hasher } from '../lib/hasher'
import { UserRepository } from '../repositories'

export class UserManager {
  private repo: UserRepository
  private hasher: Hasher

  constructor(repo: UserRepository, hasher: Hasher) {
    this.repo = repo
    this.hasher = hasher
  }

  public async create(user: User): Promise<User> {
    const hashPassword = await this.hasher.hashPassword(user.password)

    user.password = hashPassword.hash
    user.salt = hashPassword.salt

    return this.repo.insert(user)
  }

  public update(user: User): Promise<User> {
    return this.repo.update(user)
  }

  public async findByEmail(email: string): Promise<User> {
    return this.repo.find(email)
  }
}
