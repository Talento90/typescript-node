import * as Hapi from "hapi";
import * as Boom from "boom";
import { ITask, TaskModel } from "./task";

export default class TaskController {

    public createTask(request: Hapi.Request, reply: Hapi.IReply) {
        var newTask: ITask = request.payload;

        TaskModel.create(newTask).then((task) => {
            reply(task).code(201);
        }).catch((error) => {
            reply(Boom.badImplementation(error));
        });
    }

    public updateTask(request: Hapi.Request, reply: Hapi.IReply) {
        const id = request.params["id"];
        let task: ITask = request.payload;

        TaskModel.findByIdAndUpdate(id, task).then((updatedTask: ITask) => {
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

        TaskModel.findByIdAndRemove(id).then((deletedTask: ITask) => {
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
        let id = request.params["id"];

        TaskModel.findById(id).lean(true).then((task: ITask) => {
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
        var top = request.query.top;
        var skip = request.query.skip;

        TaskModel.find({}).lean(true).skip(skip).limit(top).then((tasks: Array<ITask>) => {
            reply(tasks);
        }).catch((error) => {
            reply(Boom.badImplementation(error));
        });
    }
}