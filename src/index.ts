import * as Server from "./server";
import * as Database from "./database";
import * as Configs from "./configurations";

console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);

//Init Database
Database.init();

//Starting Application Server
var server = Server.init();

server.start(() => {
    console.log('Server running at:', server.info.uri);
});