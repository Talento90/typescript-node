import * as Hapi from "hapi";
import { IPlugin } from "./plugins/interfaces";
import { IServerConfigurations } from "./configurations";
import * as Tasks from "./tasks";
import * as Users from "./users";
import { IDatabase } from "./database";


export function init(configs: IServerConfigurations, database: IDatabase) {
    const port = process.env.port || configs.port;
    const server = new Hapi.Server();

    server.connection({
        port: port,
        routes: {
            cors: true
        }
    });

    //  Setup Hapi Plugins
    const plugins: Array<string> = configs.plugins;
    const pluginOptions = {
        database: database,
        serverConfigs: configs
    };

    plugins.forEach((pluginName: string) => {
        var plugin: IPlugin = (require("./plugins/" + pluginName)).default();
        console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
        plugin.register(server, pluginOptions);
    });

    //Init Features
    Tasks.init(server, configs, database);
    Users.init(server, configs, database);

    return server;
};