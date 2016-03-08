import * as Hapi from "hapi";


export default class BaseController {
    protected server: Hapi.Server;
    
    constructor(server: Hapi.Server) {
        this.server = server;
    }
    
    protected logInfo(message: string){
        this.server.log('info', message);
    }

    protected logError(message: string){
        this.server.log('error', message);
    }
}