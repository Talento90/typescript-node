import { IRepositoryConfig, IServerConfig } from "./interfaces";

export default class Configurations implements IRepositoryConfig, IServerConfig {

    private configs: any;

    constructor() {
        const env = process.env.NODE_ENV || "dev";
        this.configs = require(`./configurations.${env}`).default();
    }

    public get connectionString() { return this.configs.repository.connectionString; }
    public get port() { return this.configs.server.port; }
}
