import {ITask} from "../interfaces";
import MemoryRepository from "./memoryRepository";
import {IRepositoryConfig} from "../../../configs/interfaces";

class TaskRepository extends MemoryRepository<ITask> {

}

export default TaskRepository;