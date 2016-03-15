import {ITask} from "../interfaces";
import MongoRepository from "./mongoRepository";
import {IRepositoryConfig} from "../../../configs/interfaces";
import { inject } from "inversify";


@inject("IRepositoryConfig")
class TaskRepository extends MongoRepository<ITask>  {
    constructor(configs: IRepositoryConfig) {
        super(configs);
    }

     protected getCollectionName(): string {
         return "tasks";
     }
}

export default TaskRepository;