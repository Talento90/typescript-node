/// <reference path="../typings.d.ts" />
import * as Hapi from "hapi";
import * as NConf from "nconf";
import * as path from "path";
import * as fs from "fs";
import { IPlugin } from "./plugins/interfaces";
import * as Tasks from "./tasks";

const serverConfigs = NConf.env().file({ file: `configurations/config.${process.env.NODE_ENV}.json` });
const port = process.env.port || serverConfigs.get("server.port");
const server = new Hapi.Server();

server.connection({
    port: port,
    routes: {
        cors: true
    }
});

//  Setup Hapi Plugins
const pluginsPath = __dirname + '/libs/plugins/';
const plugins = fs.readdirSync(pluginsPath).filter(file => fs.statSync(path.join(pluginsPath, file)).isDirectory());

plugins.forEach((pluginName: string) => {
    var plugin: IPlugin = (require("./libs/plugins/" + pluginName)).default();
    console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
    plugin.register(server);
});

//Init Features
Tasks.init(server);

export default server;