import { Context } from 'koa'
import { UserManager } from '../../managers'

export class UserController {
  private manager: UserManager

  constructor(manager: UserManager) {
    this.manager = manager
  }

  public async create(ctx: Context) {
    const userDto = ctx.body

    const newUser = await this.manager.insert(userDto)

    ctx.body = newUser
    ctx.status = 200
  }

  public async update(ctx: Context) {
    const userDto = ctx.body

    const newUser = await this.manager.insert(userDto)

    ctx.body = newUser
    ctx.status = 200
  }

  public async get(ctx: Context) {
    const id: number = ctx.params.id

    const newUser = await this.manager.findByEmail('')

    ctx.body = newUser
    ctx.status = 200
  }
}
