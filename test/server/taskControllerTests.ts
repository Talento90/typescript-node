/// <reference path="../../typings.d.ts" />
import * as chai from "chai";
import Task from "../../src/core/task";
import TaskController from "../../src/controllers/taskController";
import Server from "../../src/server";


let assert = chai.assert;

describe("TaskController", () => {
    it("Get all tasks", (done) => {
        Server.inject({ method: 'GET', url: '/api/tasks' }, (res) => {
            assert.equal(200, res.statusCode);
            done();
        });
    });

    it("Get a task by Id", (done) => {
        var payload = {
            name: "Task Test",
            description: "Task Test Description"
        };

        Server.inject({ method: 'POST', url: '/api/tasks', payload: payload }, (res) => {
            assert.equal(201, res.statusCode);
            var task: any = res.result;

            Server.inject({ method: 'GET', url: '/api/tasks/' + task._id }, (res) => {
                assert.equal(200, res.statusCode);
                done();
            });

        });
    });

    it("Task does't exists", (done) => {
        Server.inject({ method: 'GET', url: '/api/tasks/xxx' }, (res) => {
            assert.equal(404, res.statusCode);
            done();
        });
    });

    it("Create a task", (done) => {
        var payload = {
            name: "Task Test",
            description: "Task Test Description"
        };

        Server.inject({ method: 'POST', url: '/api/tasks', payload: payload }, (res) => {
            assert.equal(201, res.statusCode);

            var task: any = res.result;
            assert.equal(payload.name, task.name);
            assert.equal(payload.description, task.description);
            done();
        });
    });
});
