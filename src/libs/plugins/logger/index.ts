import {IPlugin} from '../interfaces'
import * as Hapi from 'hapi'
const Good = require('good');
const GoodConsole = require('good-console');

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
                register: Good,
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