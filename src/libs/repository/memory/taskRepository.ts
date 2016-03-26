import Task from "../../../core/task";
import MemoryRepository from "./memoryRepository";
import {IRepositoryConfig} from "../../../configs/interfaces";

class TaskRepository extends MemoryRepository<Task> {

}

export default TaskRepository;