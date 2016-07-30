import { IPlugin } from "../interfaces";
import * as Hapi from "hapi";
import { IUser, UserModel } from "../../users/user";
import * as Configs from "../../configurations";


const validateUser = (decoded, request, cb) => {
    UserModel.findById(decoded.id)
        .then((user: IUser) => {
            if (!user) {
                return cb(null, false);
            }

            return cb(null, true);
        });
};


export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {

            server.register({
                register: require('hapi-auth-jwt2')
            }, (error) => {
                if (error) {
                    console.log('error', error);
                } else {
                    server.auth.strategy('jwt', 'jwt', false,
                        {
                            key: Configs.get("server:jwt:secret"),
                            validateFunc: validateUser,
                            verifyOptions: { algorithms: ['HS256'] }
                        });
                }
            });
        },
        info: () => {
            return {
                name: "JWT Authentication",
                version: "1.0.0"
            };
        }
    };
};


