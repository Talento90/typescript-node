import Task from "../../../core/task";
import MongoRepository from "./mongoRepository";
import {IRepositoryConfig} from "../../../configs/interfaces";
import { injectable, inject } from "inversify";


@injectable()
class TaskRepository extends MongoRepository<Task>  {

    constructor(
        @inject("IRepositoryConfig") configs: IRepositoryConfig
    ) {
        super(configs);
    }

     protected getCollectionName(): string {
         return "tasks";
     }
}

export default TaskRepository;