import {ITask} from "../interfaces"
import MongoRepository from "./mongoRepository"

class TaskRepository extends MongoRepository<ITask>  {
    constructor() {
        super();
    }  
    
     protected getCollectionName(): string {
         return "tasks";
     }
}


export default TaskRepository;