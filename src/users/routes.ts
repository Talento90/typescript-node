import * as Hapi from "hapi";
import * as Joi from "joi";
import UserController from "./user-controller";
import { UserModel } from "./user";
import * as UserValidator from "./user-validator";

export default function (server: Hapi.Server) {

    const userController = new UserController();
    server.bind(userController);

    server.route({
        method: 'GET',
        path: '/api/users/info',
        config: {
            handler: userController.infoUser,
            tags: ['api', 'users'],
            description: 'Get user info.',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'User founded.'
                        },
                        '401': {
                            'description': 'Please login.'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/api/users',
        config: {
            handler: userController.deleteUser,
            tags: ['api', 'users'],
            description: 'Delete current user.',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'User deleted.',
                        },
                        '401': {
                            'description': 'User does not have authorization.'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/api/users',
        config: {
            handler: userController.updateUser,
            tags: ['api', 'users'],
            description: 'Update current user info.',
            validate: {
                params: {
                    id: Joi.string().required()
                },
                payload: UserValidator.updateUserModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Updated info.',
                        },
                        '401': {
                            'description': 'User does not have authorization.'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/api/users',
        config: {
            handler: userController.createUser,
            tags: ['api', 'users'],
            description: 'Create a user.',
            validate: {
                payload: UserValidator.createUserModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '201': {
                            'description': 'User created.'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/api/users/login',
        config: {
            handler: userController.loginUser,
            tags: ['api', 'users'],
            description: 'Login a user.',
            validate: {
                payload: UserValidator.loginUserModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'User logged in.'
                        }
                    }
                }
            }
        }
    });
}