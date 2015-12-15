/// <reference path="../typings/tsd.d.ts" />

import * as hapi from "hapi";
import Controllers from "./controllers";

var port = process.env.port || 3000;
var server = new hapi.Server();

server.connection({ port: port });

var options = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }]
};

server.register(
    {
        register: require("good"),
        options: options
    },
    (error)=>{       
        if(error){
            console.log('Error running server:', error);
        }else{
                       
            //Register Controllers
            Controllers(server);
            
            server.start(function () {
                console.log('Server running at:', server.info.uri);
            });
        }
        
    });


