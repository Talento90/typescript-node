import Server from "./server";

//Starting Application Server
Server.start(function() {
    console.log('Server running at:', Server.info.uri);
});