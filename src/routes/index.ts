import * as Hapi from "hapi";
import * as Joi from "joi";
import TaskController from '../controllers/taskController';
import * as TaskModels from '../models/taskModels';
import TaskRepository from '../libs/repository/mongo/taskRepository';


export default function(server: Hapi.Server) {

    const taskController = new TaskController(server, new TaskRepository());

    server.bind(taskController);

    server.route({
        method: 'GET',
        path: '/api/tasks/{id}',
        handler: undefined,
        config: {
            handler: taskController.getTaskById,
            tags: ['api', 'tasks'],
            description: 'Get task by id.',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Task founded.',
                            'schema': {}
                        },
                        '404': {
                            'description': 'Task does not exists.'
                        }
                    }
                }
            },
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/api/tasks',
        handler: taskController.getTasks
    });

    server.route({
        method: 'DELETE',
        path: '/api/tasks/{id}',
        handler: taskController.deleteTask
    });

    server.route({
        method: 'PUT',
        path: '/api/tasks/{id}',
        handler: taskController.updateTask
    });

    server.route({
        method: 'POST',
        path: '/api/tasks',
        handler: taskController.createTask
    });
}