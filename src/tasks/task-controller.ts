import * as Hapi from "hapi";
import * as Boom from "boom";
import { ITask } from "./task";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default class TaskController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async createTask(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.auth.credentials.id;
        var newTask: ITask = request.payload;
        newTask.userId = userId;

        try {
            let task: ITask = await this.database.taskModel.create(newTask);
            return reply(task).code(201);
        }catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async updateTask(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.auth.credentials.id;
        let id = request.params["id"];

        try {
            let task: ITask = await this.database.taskModel.findByIdAndUpdate(
                { _id: id, userId: userId },
                { $set: request.payload },
                { new: true }
            );

            if (task) {
                reply(task);
            } else {
                reply(Boom.notFound());
            }

        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async deleteTask(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let id = request.params["id"];
        let userId = request.auth.credentials.id;

        let deletedTask = await this.database.taskModel.findOneAndRemove({ _id: id, userId: userId });

        if (deletedTask) {
            return reply(deletedTask);
        } else {
            return reply(Boom.notFound());
        }
    }

    public async getTaskById(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.auth.credentials.id;
        let id = request.params["id"];

        let task = await this.database.taskModel.findOne({ _id: id, userId: userId }).lean(true);

        if (task) {
            reply(task);
        } else {
            reply(Boom.notFound());
        }
    }

    public async getTasks(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.auth.credentials.id;
        let top = request.query['top'];
        let skip = request.query['skip'];
        let tasks = await this.database.taskModel.find({ userId: userId }).lean(true).skip(skip).limit(top);

        return reply(tasks);
    }
}