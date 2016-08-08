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

    public createTask(request: Hapi.Request, reply: Hapi.IReply) {
        let userId = request.auth.credentials.id;
        var newTask: ITask = request.payload;
        newTask.userId = userId;

        this.database.taskModel.create(newTask).then((task) => {
            reply(task).code(201);
        }).catch((error) => {
            reply(Boom.badImplementation(error));
        });
    }

    public updateTask(request: Hapi.Request, reply: Hapi.IReply) {
        let userId = request.auth.credentials.id;
        let id = request.params["id"];
        let task: ITask = request.payload;

        this.database.taskModel.findByIdAndUpdate({ _id: id, userId: userId }, { $set: task }, { new: true })
            .then((updatedTask: ITask) => {
                if (updatedTask) {
                    reply(updatedTask);
                } else {
                    reply(Boom.notFound());
                }
            }).catch((error) => {
                reply(Boom.badImplementation(error));
            });
    }

    public deleteTask(request: Hapi.Request, reply: Hapi.IReply) {
        let id = request.params["id"];
        let userId = request.auth.credentials.id;

        this.database.taskModel.findOneAndRemove({ _id: id, userId: userId }).then((deletedTask: ITask) => {
            if (deletedTask) {
                reply(deletedTask);
            } else {
                reply(Boom.notFound());
            }
        }).catch((error) => {
            reply(Boom.badImplementation(error));
        });
    }

    public getTaskById(request: Hapi.Request, reply: Hapi.IReply) {
        let userId = request.auth.credentials.id;
        let id = request.params["id"];

        this.database.taskModel.findOne({ _id: id, userId: userId }).lean(true).then((task: ITask) => {
            if (task) {
                reply(task);
            } else {
                reply(Boom.notFound());
            }
        }).catch((error) => {
            reply(Boom.badImplementation(error));
        });
    }

    public getTasks(request: Hapi.Request, reply: Hapi.IReply) {
        let userId = request.auth.credentials.id;
        let top = request.query.top;
        let skip = request.query.skip;

        this.database.taskModel.find({ userId: userId }).lean(true).skip(skip).limit(top).then((tasks: Array<ITask>) => {
            reply(tasks);
        }).catch((error) => {
            reply(Boom.badImplementation(error));
        });
    }
}