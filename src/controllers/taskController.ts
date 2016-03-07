import * as Mongoose from 'mongoose'
import * as Hapi from "hapi";
import * as Boom from "boom";
import BaseController from './baseController';
import { ITask, ITaskRepository } from '../libs/repository/interfaces'

export default class taskController extends BaseController {
    private taskRepository: ITaskRepository;
    
    constructor(taskRepository: ITaskRepository) {
        super();
        this.taskRepository = taskRepository;
    }

    public createTask(request: Hapi.Request, reply: Hapi.IReply) {
        
    }
    
    public updateTask(request: Hapi.Request, reply: Hapi.IReply) {
        
    }
    
    public deleteTask(request: Hapi.Request, reply: Hapi.IReply) {
        
    }

    public getTaskById(request: Hapi.Request, reply: Hapi.IReply) {
        const id = request.params["id"]
        console.log(id);
        console.log(this.taskRepository);
        this.taskRepository.findById(id).then((task: ITask) => {
            if(task){
                reply(task);
            }else{
                reply(Boom.notFound());
            }           
        }).catch((error) => {
           reply(Boom.badImplementation(error));
        }); 
    }

    public getTasks(request: Hapi.Request, reply: Hapi.IReply) {

    }
}