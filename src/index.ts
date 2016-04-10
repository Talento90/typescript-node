import Server from "./server";

console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);

//Starting Application Server
Server.start(() => {
    console.log('Server running at:', Server.info.uri);
});