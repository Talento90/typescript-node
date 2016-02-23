/// <reference path="../typings.d.ts" />

import * as Hapi from "hapi";
import Routes from "./routes";

var port = process.env.port || 3000;
var server = new Hapi.Server();

server.connection({ port: port });
          
//Register Routes
Routes(server);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
