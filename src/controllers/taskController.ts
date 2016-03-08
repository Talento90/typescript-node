import * as Hapi from "hapi";
import * as Boom from "boom";
import BaseController from './baseController';
import { ITask, ITaskRepository } from '../libs/repository/interfaces'

export default class taskController extends BaseController {
    private taskRepository: ITaskRepository;

    constructor(server: Hapi.Server, taskRepository: ITaskRepository) {
        super(server);
        this.taskRepository = taskRepository;
    }

    public createTask(request: Hapi.Request, reply: Hapi.IReply) {
        var newTask: ITask = request.payload;      
        
        this.taskRepository.create(newTask).then((task) => {
            reply(task);
        }).catch((error) => {
            reply(Boom.badImplementation(error));
        });
    }

    public updateTask(request: Hapi.Request, reply: Hapi.IReply) {
        const id = request.params["id"]
        
        this.taskRepository.findById(id).then((task: ITask) => {
            if (task) {
                var updateTask: ITask = request.payload;      
        
                this.taskRepository.findByIdAndUpdate(id, updateTask).then((updatedTask: ITask) => {
                    reply(updatedTask);
                }).catch((error) => {
                    reply(Boom.badImplementation(error));
                });
            } else {
                reply(Boom.notFound());
            }
        }).catch((error) => {
            reply(Boom.badImplementation(error));
        });
    }

    public deleteTask(request: Hapi.Request, reply: Hapi.IReply) {
        const id = request.params["id"]

        this.taskRepository.findById(id).then((task: ITask) => {
            if (task) {
                this.taskRepository.findByIdAndDelete(id).then(() => {
                    reply(task);
                }).catch((error) => {
                    reply(Boom.badImplementation(error));
                });
            } else {
                reply(Boom.notFound());
            }
        }).catch((error) => {
            reply(Boom.badImplementation(error));
        });
    }

    public getTaskById(request: Hapi.Request, reply: Hapi.IReply) {
        const id = request.params["id"]

        this.taskRepository.findById(id).then((task: ITask) => {
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
        this.taskRepository.find({}).then((tasks: Array<ITask>) => {
            reply(tasks);
        }).catch((error) => {
            reply(Boom.badImplementation(error));
        });
    }
}