import { Context } from 'koa'

export default class HealthController {
  public getHealth(ctx: Context) {
    ctx.status = 200
  }
}
