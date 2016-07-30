import * as Hapi from "hapi";
import * as Boom from "boom";
import * as Jwt from "jsonwebtoken";
import { IUser, UserModel } from "./user";
import * as Configs from "../configurations";

const generateToken = (user: IUser) => {
    const jwtSecret = Configs.get("server:jwt:secret");
    const jwtExpiration = Configs.get("server:jwt:expiration");

    return Jwt.sign({
        id: user._id
    }, jwtSecret, { expiresIn: jwtExpiration });
};


export default class UserController {

    public loginUser(request: Hapi.Request, reply: Hapi.IReply) {
        const email = request.payload.email;
        const password = request.payload.password;

        UserModel.findOne({ email: email })
            .then((user: IUser) => {

                if (!user) {
                    return reply(Boom.unauthorized("User does not exists."));
                }

                if (!user.validatePassword(password)) {
                    return reply(Boom.unauthorized("Password is invalid."));
                }

                const token = generateToken(user);

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

        UserModel.create(user).then((user) => {
            const token = generateToken(user);
            reply({ token: token }).code(201);
        })
            .catch((error) => {
                reply(Boom.badImplementation(error));
            });
    }

    public updateUser(request: Hapi.Request, reply: Hapi.IReply) {
        const id = request.auth.credentials.id;
        const user: IUser = request.payload;

        UserModel.findByIdAndUpdate(id, { $set: user }, { new: true })
            .then((user) => {
                reply(user);
            })
            .catch((error) => {
                reply(Boom.badImplementation(error));
            });
    }

    public deleteUser(request: Hapi.Request, reply: Hapi.IReply) {
        const id = request.auth.credentials.id;

        UserModel.findByIdAndRemove(id)
            .then((user: IUser) => {
                reply(user);
            })
            .catch((error) => {
                reply(Boom.badImplementation(error));
            });
    }


    public infoUser(request: Hapi.Request, reply: Hapi.IReply) {
        const id = request.auth.credentials.id;

        UserModel.findById(id)
            .then((user: IUser) => {
                reply(user);
            })
            .catch((error) => {
                reply(Boom.badImplementation(error));
            });
    }
}