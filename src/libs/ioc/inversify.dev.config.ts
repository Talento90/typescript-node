import { IKernel } from "inversify";
import {IRepositoryConfig, IServerConfig} from "../../configs/interfaces";
import Configurations from "../../configs/configurations";
import { ITaskRepository } from "../repository/interfaces";
import TaskRepository from "../repository/mongo/taskRepository";


export default function(kernel: IKernel) {
    //Configurations
    kernel.bind<IRepositoryConfig>("IRepositoryConfig").to(Configurations).inSingletonScope();
    kernel.bind<IServerConfig>("IServerConfig").to(Configurations).inSingletonScope();

    //Repositories
    kernel.bind<ITaskRepository>("ITaskRepository").to(TaskRepository).inSingletonScope();
};