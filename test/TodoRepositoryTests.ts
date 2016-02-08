/// <reference path="../typings/main.d.ts" />

import * as chai from "chai";
import * as TodoRepository from "../src/repository/TodoRepository";

let assert = chai.assert;

describe("TodoRepository", function() {
  it("should return all todos", function(done) {
    var todos = TodoRepository.getAllTodos();  
    todos.then((results) => {
        assert.equal(results.length, 2);
        done();
    }); 
  });
});
