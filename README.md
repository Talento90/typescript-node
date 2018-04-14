# typescript-node [![Build Status](https://travis-ci.org/Talento90/typescript-node.svg?branch=master)](https://travis-ci.org/Talento90/typescript-node) [![codecov](https://codecov.io/gh/Talento90/typescript-node/branch/master/graph/badge.svg)](https://codecov.io/gh/Talento90/typescript-node)


Template for building nodejs and typescript services. The main goal of this boilerplate is to offer a good Developer Experience (eg: debugging, watch and recompile) by providing the following features out of the box:

***Features***

* Language - [TypeScript](https://www.typescriptlang.org/)
* REST API - [koa2](http://koajs.com/)
* Graceful Shutdown - [Pattern](https://nemethgergely.com/nodejs-healthcheck-graceful-shutdown/)
* HealthCheck - [Patern /health](http://microservices.io/patterns/observability/health-check-api.html)
* SQL Database & Migrations - [knex](http://knexjs.org/)
* Authentication and Authorization - [JWT Tokens](https://github.com/auth0/node-jsonwebtoken)
* Validation - [Joi](https://github.com/hapijs/joi)
* Testing - [Mocha](https://mochajs.org/) [Chai](http://www.chaijs.com/) + [Sinon](http://sinonjs.org/) [Coverage](https://istanbul.js.org/)
* Code Style - [Prettier](https://prettier.io/)
* Git Hooks - [Husky](https://github.com/typicode/husky)

## Installation & Run

* *npm install* - Install dependencies
* *npm run start* - Start application (It needs a mysql database)

### Running with Docker

* *docker-compose up* (compose and run, it also creates the mysql database)
* *docker-compose down* (Destroy application and mysql containers)

## Useful npm commands

* *npm run build* - Transpile TypeScript code
* *npm run clean* - Remove dist, node_modules, coverage folders
* *npm run coverage* - Run NYC coverage
* *npm run lint* - Lint your TypeScript code
* *npm run start:dev* - Run application in dev mode (debug & watch). Debug mode is running on port 5858 (open `chrome://inspect/#devices`).
* *npm run test* - Run unit tests
* *npm run test:integration* - Run integration tests
* *npm run test:all* - Run Unit and Integration tests
