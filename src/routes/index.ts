import * as Hapi from "hapi";
import TaskController from '../controllers/taskController';
import * as TaskModels from '../models/taskModels';
import TaskRepository from '../libs/repository/mongo/taskRepository';


export default function (server: Hapi.Server) { 
    const taskController = new TaskController(new TaskRepository());

    server.bind(taskController);
    
    server.route({
        method: 'GET',
        path: '/api/todos/{id}',
        handler: taskController.getTaskById
    });
}