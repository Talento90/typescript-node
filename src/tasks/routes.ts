import * as Hapi from "hapi";
import * as Joi from "joi";
import TaskController from "./task-controller";
import * as TaskValidator from "./task-validator";
import { jwtValidator } from "../users/user-validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const taskController = new TaskController(configs, database);
    server.bind(taskController);

    server.route({
        method: 'GET',
        path: '/tasks/{id}',
        config: {
            handler: taskController.getTaskById,
            auth: "jwt",
            tags: ['api', 'tasks'],
            description: 'Get task by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                },
                headers: jwtValidator
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
        }
    });

    server.route({
        method: 'GET',
        path: '/tasks',
        config: {
            handler: taskController.getTasks,
            auth: "jwt",
            tags: ['api', 'tasks'],
            description: 'Get all tasks.',
            validate: {
                query: {
                    top: Joi.number().default(5),
                    skip: Joi.number().default(0)
                },
                headers: jwtValidator
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/tasks/{id}',
        config: {
            handler: taskController.deleteTask,
            auth: "jwt",
            tags: ['api', 'tasks'],
            description: 'Delete task by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                },
                headers: jwtValidator
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Deleted Task.',
                        },
                        '404': {
                            'description': 'Task does not exists.'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/tasks/{id}',
        config: {
            handler: taskController.updateTask,
            auth: "jwt",
            tags: ['api', 'tasks'],
            description: 'Update task by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                },
                payload: TaskValidator.updateTaskModel,
                headers: jwtValidator
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Deleted Task.',
                        },
                        '404': {
                            'description': 'Task does not exists.'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/tasks',
        config: {
            handler: taskController.createTask,
            auth: "jwt",
            tags: ['api', 'tasks'],
            description: 'Create a task.',
            validate: {
                payload: TaskValidator.createTaskModel,
                headers: jwtValidator
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '201': {
                            'description': 'Created Task.'
                        }
                    }
                }
            }
        }
    });
}