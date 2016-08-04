import * as Hapi from "hapi";
import * as Boom from "boom";
import * as Jwt from "jsonwebtoken";
import { IUser } from "./user";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";


export default class UserController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configurations: IServerConfigurations, database: IDatabase) {
        this.database = database;
    }

    private generateToken(user: IUser) {
        const jwtSecret = this.configs.jwtSecret;
        const jwtExpiration = this.configs.jwtExpiration;

        return Jwt.sign({ id: user._id }, jwtSecret, { expiresIn: jwtExpiration });
    }


    public loginUser(request: Hapi.Request, reply: Hapi.IReply) {
        const email = request.payload.email;
        const password = request.payload.password;

        this.database.userModel.findOne({ email: email })
            .then((user: IUser) => {

                if (!user) {
                    return reply(Boom.unauthorized("User does not exists."));
                }

                if (!user.validatePassword(password)) {
                    return reply(Boom.unauthorized("Password is invalid."));
                }

                const token = this.generateToken(user);

                reply({
                    token: token
                });
            })
            .catch((error) => {
                reply(Boom.badImplementation(error));
            });
    }

    public createUser(request: Hapi.Request, reply: Hapi.IReply) {
        const user: IUser = request.payload;

        this.database.userModel.create(user).then((user) => {
            const token = this.generateToken(user);
            reply({ token: token }).code(201);
        })
            .catch((error) => {
                reply(Boom.badImplementation(error));
            });
    }

    public updateUser(request: Hapi.Request, reply: Hapi.IReply) {
        const id = request.auth.credentials.id;
        const user: IUser = request.payload;

        this.database.userModel.findByIdAndUpdate(id, { $set: user }, { new: true })
            .then((user) => {
                reply(user);
            })
            .catch((error) => {
                reply(Boom.badImplementation(error));
            });
    }

    public deleteUser(request: Hapi.Request, reply: Hapi.IReply) {
        const id = request.auth.credentials.id;

        this.database.userModel.findByIdAndRemove(id)
            .then((user: IUser) => {
                reply(user);
            })
            .catch((error) => {
                reply(Boom.badImplementation(error));
            });
    }


    public infoUser(request: Hapi.Request, reply: Hapi.IReply) {
        const id = request.auth.credentials.id;

        this.database.userModel.findById(id)
            .then((user: IUser) => {
                reply(user);
            })
            .catch((error) => {
                reply(Boom.badImplementation(error));
            });
    }
}