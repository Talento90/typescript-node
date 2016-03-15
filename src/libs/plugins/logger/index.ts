import {IPlugin} from "../interfaces";
import * as Hapi from "hapi";

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {
            const opts = {
                opsInterval: 1000,
                reporters: [{
                    reporter: require('good-console'),
                    events: { error: '*', log: '*', response: '*', request: '*' }
                }]
            };

            server.register({
                register: require('good'),
                options: opts
            }, (error) => {
                if (error) {
                    console.log('error', error);
                }
            });
        },
        info: () => {
            return {
                name: "Good Logger",
                version: "1.0.0"
            };
        }
    }
};