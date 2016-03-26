import * as Hapi from "hapi";
import * as Boom from "boom";
import * as Joi from "joi";
import BaseController from "./baseController";
import * as TaskModel from "../models/taskModel";
import Task from "../core/Task";
import { ITaskRepository } from "../libs/repository/interfaces";

export default class TaskController extends BaseController {
    private taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository) {
        super();
        this.taskRepository = taskRepository;
    }

    public createTask(): Hapi.IRouteAdditionalConfigurationOptions {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                var newTask: Task = request.payload;

                this.taskRepository.create(newTask).then((task) => {
                    reply(task).code(201);
                }).catch((error) => {
                    reply(Boom.badImplementation(error));
                });
            },
            tags: ['api', 'tasks'],
            description: 'Create a task.',
            validate: {
                payload: TaskModel.createTaskModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '201': {
                            'description': 'Created Task.',
                            'schema': TaskModel.taskModel
                        }
                    }
                }
            }
        };
    }

    public updateTask(): Hapi.IRouteAdditionalConfigurationOptions {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                const id = request.params["id"];

                this.taskRepository.findById(id).then((task: Task) => {
                    if (task) {
                        var updateTask: Task = request.payload;
                        task.completed = updateTask.completed;
                        task.description = updateTask.description;
                        task.name = updateTask.name;
                        this.taskRepository.findByIdAndUpdate(id, task).then((updatedTask: Task) => {
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
            },
            tags: ['api', 'tasks'],
            description: 'Update task by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                },
                payload: TaskModel.updateTaskModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Deleted Task.',
                            'schema': TaskModel.taskModel
                        },
                        '404': {
                            'description': 'Task does not exists.'
                        }
                    }
                }
            }
        };
    }

    public deleteTask(): Hapi.IRouteAdditionalConfigurationOptions {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                const id = request.params["id"];

                this.taskRepository.findById(id).then((task: Task) => {
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
            },
            tags: ['api', 'tasks'],
            description: 'Delete task by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            response: {
                schema: TaskModel.taskModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Deleted Task.',
                            'schema': TaskModel.taskModel
                        },
                        '404': {
                            'description': 'Task does not exists.'
                        }
                    }
                }
            }
        };
    }

    public getTaskById(): Hapi.IRouteAdditionalConfigurationOptions {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                const id = request.params["id"];
                console.log(id);
                this.taskRepository.findById(id).then((task: Task) => {
                    if (task) {
                        reply(task);
                    } else {
                        reply(Boom.notFound());
                    }
                }).catch((error) => {
                    reply(Boom.badImplementation(error));
                });
            },
            tags: ['api', 'tasks'],
            description: 'Get task by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            response: {
                schema: TaskModel.taskModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Task founded.'
                        },
                        '404': {
                            'description': 'Task does not exists.'
                        }
                    }
                }
            }
        };
    }

    public getTasks(): Hapi.IRouteAdditionalConfigurationOptions {
        return {
            handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                var top = request.query.top;
                var skip = request.query.skip;

                this.taskRepository.find({}, top, skip).then((tasks: Array<Task>) => {
                    reply(tasks);
                }).catch((error) => {
                    reply(Boom.badImplementation(error));
                });
            },
            tags: ['api', 'tasks'],
            description: 'Get all tasks.',
            validate: {
                query: {
                    top: Joi.number().default(5),
                    skip: Joi.number().default(0)
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Returned Tasks.',
                            'schema': TaskModel.taskModel
                        }
                    }
                }
            }
        };
    }
}