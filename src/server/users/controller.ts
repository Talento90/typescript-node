import { Context } from 'koa'
import { UserManager } from '../../managers'

export class UserController {
  private manager: UserManager

  constructor(manager: UserManager) {
    this.manager = manager
  }

  public async createUser(ctx: Context) {
    const userDto = ctx.body

    const newUser = await this.manager.insert(userDto)

    ctx.body = newUser
    ctx.status = 200
  }
}
