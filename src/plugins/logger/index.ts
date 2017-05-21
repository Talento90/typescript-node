import { IPlugin } from "../interfaces";
import * as Hapi from "hapi";

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {
            const opts = {
                ops: {
                    interval: 1000
                },
                reporters: {
                    consoleReporter: [
                        {
                            module: 'good-console'
                        }
                    ]
                }
            };

            server.register({
                register: require('good'),
                options: opts
            }, (error) => {
                if (error) {
                    console.log(`Error initializing logger: ${error}`);
                }
            });
        },
        info: () => {
            return {
                name: "Good Logger",
                version: "1.0.0"
            };
        }
    };
};