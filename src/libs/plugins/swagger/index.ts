import {IPlugin, IPluginInfo} from '../interfaces'
import * as Hapi from 'hapi'
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {
            server.register([
                Inert,
                Vision,
                {
                    register: HapiSwagger,
                    options: {
                        info: {
                            title: 'Task Api',
                            description: 'Simple Task Api.',
                            version: '1.0'
                        },
                        tags: [
                            {
                                'name': 'tasks',
                                'description': 'Api tasks interface.'
                            }
                        ],
                        enableDocumentation: true,
                        documentationPath: '/documentation'
                    }
                }
            ]
                , (error) => {
                    if (error) {
                        console.log('error', error);
                    }
                });
        },
        info: () => {
            return {
                name: "Swagger Documentation",
                version: "1.0.0"
            };
        }
    }
};