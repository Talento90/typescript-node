import { Context } from 'koa'
import { User } from '../../entities'
import { AuthUser } from '../../lib/authentication'
import { UserManager } from '../../managers'
import { CreateUser, UserModel } from './model'

export class UserController {
  private manager: UserManager

  constructor(manager: UserManager) {
    this.manager = manager
  }

  public async create(ctx: Context) {
    const userDto: CreateUser = ctx.request.body
    const newUser = await this.manager.create(userDto as User)

    ctx.body = new UserModel(newUser)
    ctx.status = 201
  }

  public async login(ctx: Context) {
    ctx.body = {
      token: await this.manager.login(
        ctx.request.body.email,
        ctx.request.body.password
      )
    }
  }

  public async update(ctx: Context) {
    const userDto = ctx.body

    const newUser = await this.manager.create(userDto)

    ctx.body = newUser
    ctx.status = 200
  }

  public async get(ctx: Context) {
    const authUser: AuthUser = ctx.state.user
    const user = await this.manager.findByEmail(authUser.email)

    ctx.body = new UserModel(user)
    ctx.status = 200
  }
}
