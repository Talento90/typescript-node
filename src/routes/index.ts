import * as Hapi from "hapi";
import TaskController from '../controllers/taskController';
import TaskRepository from '../libs/repository/mongo/taskRepository';


export default function(server: Hapi.Server) {

    const taskController = new TaskController(server, new TaskRepository());

    server.route({
        method: 'GET',
        path: '/api/tasks/{id}',
        handler: undefined,
        config: taskController.getTaskById()
    });

    server.route({
        method: 'GET',
        path: '/api/tasks',
        handler: undefined,
        config: taskController.getTasks()
    });

    server.route({
        method: 'DELETE',
        path: '/api/tasks/{id}',
        handler: undefined,
        config: taskController.deleteTask()
    });

    server.route({
        method: 'PUT',
        path: '/api/tasks/{id}',
        handler: undefined,
        config: taskController.updateTask()
    });

    server.route({
        method: 'POST',
        path: '/api/tasks',
        handler: undefined,
        config: taskController.createTask()
    });
}