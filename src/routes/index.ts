import * as Hapi from "hapi";
import TaskController from '../controllers/taskController';

export default function (server: Hapi.Server) {

    let taskController = new TaskController();

    server.route({
        method: 'GET',
        path: '/api/todos',
        handler: () => taskController.getAllTasks
    });

    server.route({
        method: 'GET',
        path: '/api/todos/{id}',
        handler: () => taskController.getAllTasks
    });

    server.route({
        method: 'PUT',
        path: '/api/todos/{id}',
        handler: () => taskController.getAllTasks
    });

    server.route({
        method: 'POST',
        path: '/api/todos',
        handler: () => taskController.getAllTasks
    });

    server.route({
        method: 'DELETE',
        path: '/api/todos/{id}',
        handler: () => taskController.getAllTasks
    });
}