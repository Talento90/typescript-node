/// <reference path="../typings/main.d.ts" />

import * as chai from "chai";
import TaskRepository from "../src/libs/repository/mongo/taskRepository";
import {ITask} from "../src/libs/repository/interfaces";

let assert = chai.assert;

describe("TaskRepository", function() {
  it("Create a task", function(done) {
      var repo = new TaskRepository();
      
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
