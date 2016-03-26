import Task from "../../../core/task";
import MongoRepository from "./mongoRepository";
import {IRepositoryConfig} from "../../../configs/interfaces";
import { inject } from "inversify";


@inject("IRepositoryConfig")
class TaskRepository extends MongoRepository<Task>  {
    constructor(configs: IRepositoryConfig) {
        super(configs);
    }

     protected getCollectionName(): string {
         return "tasks";
     }
}

export default TaskRepository;