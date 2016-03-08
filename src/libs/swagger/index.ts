const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');


export default function() {
    return [
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
    ];
};