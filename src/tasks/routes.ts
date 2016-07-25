import * as Hapi from "hapi";
import * as Joi from "joi";
import TaskController from "./task-controller";
import { TaskModel } from "./task";
import * as TaskValidator from "./task-validator";

export default function (server: Hapi.Server) {

    const taskController = new TaskController();
    server.bind(taskController);

    server.route({
        method: 'GET',
        path: '/api/tasks/{id}',
        config: {
            handler: taskController.getTaskById,
            tags: ['api', 'tasks'],
            description: 'Get task by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            response: {
                schema: TaskValidator.taskModel
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
        path: '/api/tasks',
        config: {
            handler: taskController.getTasks,
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
                            'schema': TaskValidator.taskModel
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/api/tasks/{id}',
        config: {
            handler: taskController.deleteTask,
            tags: ['api', 'tasks'],
            description: 'Delete task by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            response: {
                schema: TaskValidator.taskModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Deleted Task.',
                            'schema': TaskValidator.taskModel
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
        path: '/api/tasks/{id}',
        config: {
            handler: taskController.updateTask,
            tags: ['api', 'tasks'],
            description: 'Update task by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                },
                payload: TaskValidator.updateTaskModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Deleted Task.',
                            'schema': TaskValidator.taskModel
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
        path: '/api/tasks',
        config: {
            handler: taskController.createTask,
            tags: ['api', 'tasks'],
            description: 'Create a task.',
            validate: {
                payload: TaskValidator.createTaskModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '201': {
                            'description': 'Created Task.',
                            'schema': TaskValidator.taskModel
                        }
                    }
                }
            }
        }
    });
}