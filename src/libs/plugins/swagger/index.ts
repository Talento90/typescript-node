import {IPlugin, IPluginInfo} from '../interfaces'
import * as Hapi from 'hapi'

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {
            server.register([
                require('inert'),
                require('vision'),
                {
                    register: require('hapi-swagger'),
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