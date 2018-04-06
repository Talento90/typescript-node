import { Context } from 'koa'
import { Task } from '../../entities'
import { AuthUser } from '../../lib/authentication'
import { TaskManager } from '../../managers'
import { CreateTask, TaskModel } from './model'

export class TaskController {
  private manager: TaskManager

  constructor(manager: TaskManager) {
    this.manager = manager
  }

  public async get(ctx: Context) {
    const task = await this.manager.find(ctx.params.id)

    ctx.body = new TaskModel(task)
    ctx.status = 200
  }

  public async getAll(ctx: Context) {
    const authUser: AuthUser = ctx.state.user
    const limit = isNaN(ctx.query.limit) ? 10 : parseInt(ctx.query.limit, 10)
    const offset = isNaN(ctx.query.offset) ? 10 : parseInt(ctx.query.offset, 10)
    const tasks = await this.manager.findUserTasks(
      authUser.email,
      limit,
      offset
    )

    ctx.body = tasks.map((t: Task) => new TaskModel(t))
    ctx.status = 200
  }

  public async create(ctx: Context) {
    const taskDto: CreateTask = ctx.request.body
    const newTask = await this.manager.create(taskDto as Task)

    ctx.body = new TaskModel(newTask)
    ctx.status = 201
  }

  public async update(ctx: Context) {
    const taskDto = ctx.request.body
    const task = await this.manager.find(ctx.params.id)

    task.name = taskDto.name
    task.description = taskDto.description
    task.done = taskDto.done

    const updatedTask = await this.manager.update(task)

    ctx.body = new TaskModel(updatedTask)
    ctx.status = 200
  }

  public async delete(ctx: Context) {
    const authUser: AuthUser = ctx.state.user
    const id: number = ctx.params.id

    await this.manager.delete(authUser.email, id)

    ctx.status = 204
  }
}
