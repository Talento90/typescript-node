/// <reference path="../typings.d.ts" />
import * as Hapi from "hapi";
import Routes from "./routes";
import Logger from "./libs/logger";
import Swagger from "./libs/swagger";


var port = process.env.port || 3000;
var server = new Hapi.Server();

server.connection({ port: port });

//  Setup Hapi Plugins
var plugins = [];

plugins = plugins.concat(Swagger(), Logger());

server.register(plugins, (error => {
    if (error) {
        throw error;
    }
}));

//Register Routes
Routes(server);

server.start(function() {
    console.log('Server running at:', server.info.uri);
});
