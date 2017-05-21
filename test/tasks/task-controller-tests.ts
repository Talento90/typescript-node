import * as chai from "chai";
import TaskController from "../../src/tasks/task-controller";
import { ITask } from "../../src/tasks/task";
import { IUser } from "../../src/users/user";
import * as Configs from "../../src/configurations";
import * as Server from "../../src/server";
import * as Database from "../../src/database";
import * as Utils from "../utils";

const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const assert = chai.assert;
const serverConfig = Configs.getServerConfigs();

describe("TastController Tests", () => {

    let server;

    before((done) => {
        Server.init(serverConfig, database).then((s) => {
            server = s;
            done();
        });
    });

    beforeEach((done) => {
        Utils.createSeedTaskData(database, done);
    });

    afterEach((done) => {
        Utils.clearDatabase(database, done);
    });

    it("Get tasks", (done) => {
        var user = Utils.createUserDummy();

        server.inject({
            method: 'POST', url: serverConfig.routePrefix + '/users/login', payload: {
                email: user.email,
                password: user.password
            }
        }, (res) => {
            assert.equal(200, res.statusCode);
            var login: any = JSON.parse(res.payload);

            server.inject({ method: 'Get', url: serverConfig.routePrefix + '/tasks', headers: { "authorization": login.token } }, (res) => {
                assert.equal(200, res.statusCode);
                var responseBody: Array<ITask> = JSON.parse(res.payload);
                assert.equal(3, responseBody.length);
                done();
            });
        });
    });

    it("Get single task", (done) => {
        var user = Utils.createUserDummy();

        server.inject({
            method: 'POST', url: serverConfig.routePrefix + '/users/login', payload: {
                email: user.email,
                password: user.password
            }
        }, (res) => {
            assert.equal(200, res.statusCode);
            var login: any = JSON.parse(res.payload);

            database.taskModel.findOne({}).then((task) => {
                server.inject({
                    method: 'Get',
                    url: serverConfig.routePrefix + '/tasks/' + task._id,
                    headers: { "authorization": login.token }
                }, (res) => {
                    assert.equal(200, res.statusCode);
                    var responseBody: ITask = JSON.parse(res.payload);
                    assert.equal(task.name, responseBody.name);
                    done();
                });
            });
        });
    });

    it("Create task", (done) => {
        var user = Utils.createUserDummy();

        server.inject({
            method: 'POST',
            url: serverConfig.routePrefix + '/users/login',
            payload: { email: user.email, password: user.password }
        }, (res) => {
            assert.equal(200, res.statusCode);
            var login: any = JSON.parse(res.payload);

            database.userModel.findOne({ email: user.email }).then((user: IUser) => {
                var task = Utils.createTaskDummy();

                server.inject({
                    method: 'POST',
                    url: serverConfig.routePrefix + '/tasks',
                    payload: task,
                    headers: { "authorization": login.token }
                }, (res) => {
                    assert.equal(201, res.statusCode);
                    var responseBody: ITask = <ITask>JSON.parse(res.payload);
                    assert.equal(task.name, responseBody.name);
                    assert.equal(task.description, responseBody.description);
                    done();
                });
            });
        });
    });

    it("Update task", (done) => {
        var user = Utils.createUserDummy();

        server.inject({
            method: 'POST',
            url: serverConfig.routePrefix + '/users/login',
            payload: { email: user.email, password: user.password }
        }, (res) => {
            assert.equal(200, res.statusCode);
            var login: any = JSON.parse(res.payload);

            database.taskModel.findOne({}).then((task) => {

                var updateTask = {
                    completed: true,
                    name: task.name,
                    description: task.description
                };

                server.inject({
                    method: 'PUT',
                    url: serverConfig.routePrefix + '/tasks/' + task._id,
                    payload: updateTask,
                    headers: { "authorization": login.token }
                },
                    (res) => {
                        assert.equal(200, res.statusCode);
                        console.log(res.payload);
                        var responseBody: ITask = JSON.parse(res.payload);
                        assert.isTrue(responseBody.completed);
                        done();
                    });
            });
        });
    });

    it("Delete single task", (done) => {
        var user = Utils.createUserDummy();

        server.inject({
            method: 'POST',
            url: serverConfig.routePrefix + '/users/login',
            payload: { email: user.email, password: user.password }
        }, (res) => {
            assert.equal(200, res.statusCode);
            var login: any = JSON.parse(res.payload);

            database.taskModel.findOne({}).then((task) => {
                server.inject({
                    method: 'DELETE',
                    url: serverConfig.routePrefix + '/tasks/' + task._id,
                    headers: { "authorization": login.token }
                }, (res) => {
                    assert.equal(200, res.statusCode);
                    var responseBody: ITask = JSON.parse(res.payload);
                    assert.equal(task.name, responseBody.name);

                    database.taskModel.findById(responseBody._id).then((deletedTask) => {
                        assert.isNull(deletedTask);
                        done();
                    });
                });
            });
        });
    });
});
