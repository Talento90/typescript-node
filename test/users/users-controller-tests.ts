/// <reference path="../../typings.d.ts" />
import * as chai from "chai";
import * as sinon from "sinon";
import UserController from "../../src/users/user-controller";
import { IUser, UserModel } from "../../src/users/user";
import * as Configs from "../../src/configurations";
import * as Server from "../../src/server";
import * as Database from "../../src/database";

const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const assert = chai.assert;
const serverConfig = Configs.getServerConfigs();
const server = Server.init(serverConfig, database);

describe("UserController", () => {
    it("Create user", (done) => {
        var user = {
            email: "user@mail.com",
            name: "John Robot",
            password: "123123"
        };

        server.inject({ method: 'POST', url: '/users', payload: user }, (res) => {
            var userMock = sinon.mock(UserModel);
            userMock.expects('create').yields(null, user);
            assert.equal(201, res.statusCode);
            done();
        });
    });
});
