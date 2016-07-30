/// <reference path="../typings.d.ts" />
import * as Hapi from "hapi";
import { IPlugin } from "./plugins/interfaces";
import * as Tasks from "./tasks";
import * as Users from "./users";
import * as Confs from "./configurations";

export function init() {
    const port = process.env.port || Confs.get("server:port");
    const server = new Hapi.Server();

    server.connection({
        port: port,
        routes: {
            cors: true
        }
    });

    //  Setup Hapi Plugins
    const plugins: Array<string> = Confs.get("server:plugins");

    plugins.forEach((pluginName: string) => {
        var plugin: IPlugin = (require("./plugins/" + pluginName)).default();
        console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
        plugin.register(server);
    });

    //Init Features
    Tasks.init(server);
    Users.init(server);

    return server;
};