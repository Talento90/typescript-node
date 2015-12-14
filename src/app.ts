/// <reference path="../typings/tsd.d.ts" />

import * as hapi from "hapi";
import Controllers from "./controllers";

var port = process.env.port || 3000;
var server = new hapi.Server();

server.connection({ port: port });

//Register Controllers
Controllers(server);


server.start(function () {
    console.log('Server running at:', server.info.uri);
});