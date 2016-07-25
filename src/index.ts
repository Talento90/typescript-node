import * as NConf from "nconf";
import * as Server from "./server";
import * as Database from "./database";

console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);

//Read Configurations
const configs = NConf.argv().env().file({ file: `configurations/config.${process.env.NODE_ENV}.json` });

//Init Database
const connectionString = configs.get("database.connectionString");
Database.init(connectionString);

//Starting Application Server
var server = Server.init();

server.start(() => {
    console.log('Server running at:', server.info.uri);
});