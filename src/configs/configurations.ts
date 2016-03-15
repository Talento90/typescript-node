import { IRepositoryConfig, IServerConfig } from "./interfaces"

export default class Configurations implements IRepositoryConfig, IServerConfig {

    public get connectionString() { return "mongodb://localhost/taskdb"; }
    public get port() { return 3000 }

}

