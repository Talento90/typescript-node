/// <reference path="../../../typings.d.ts" />
import * as chai from "chai";
import TaskRepository from "../../../src/libs/repository/mongo/taskRepository";
import { ITask, ITaskRepository } from "../../../src/libs/repository/interfaces";
import Kernel from "../../../src/libs/ioc";

let assert = chai.assert;

describe("TaskRepository", function() {
  it("Create a task", function(done) {
      var repo: ITaskRepository = Kernel.get<ITaskRepository>("ITaskRepository");

      var task: ITask = {
          _id: undefined,
          name: "task",
          description: "teste",
          completed: false,
          createdDate: undefined,
          updatedAt: undefined
      };
      
      repo.create(task).then((createdTask) => {
          assert.isNotNull(task._id);
          assert.isNotNull(task.createdDate);
          done();
      }).catch((error) => {
          done(error);
      });
  });
});
