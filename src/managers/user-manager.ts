import { User } from '../entities'
import { UserRepository } from '../repositories'

export class UserManager {
  private repo: UserRepository

  constructor(repo: UserRepository) {
    this.repo = repo
  }

  public insert(user: User): Promise<User> {
    return this.repo.insert(user)
  }

  public update(user: User): Promise<User> {
    return this.repo.update(user)
  }

  public async findByEmail(email: string): Promise<User> {
    return this.repo.find(email)
  }
}
