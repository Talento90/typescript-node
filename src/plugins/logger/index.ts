import { IPlugin } from "../interfaces";
import * as Hapi from "hapi";

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server): Promise<void> => {
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

            return new Promise<void>((resolve) => {
                server.register({
                    register: require('good'),
                    options: opts
                }, (error) => {
                    if (error) {
                        console.log(`Error registering logger plugin: ${error}`);
                    }

                    resolve();
                });
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