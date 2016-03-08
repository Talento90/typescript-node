const Good = require('good');
const GoodConsole = require('good-console');

export default function Register() {

    const opts = {
        opsInterval: 1000,
        reporters: [{
            reporter: require('good-console'),
            events: { error: '*', log: '*', response: '*', request: '*' }
        }]
    };

    return [{
        register: Good,
        options: opts
    }];
};