/// <reference path="../typings/tsd.d.ts" />

import * as assert from "assert";
import * as TodoRepository from "../src/repository/TodoRepository";

describe("TodoRepository", function() {
  it("should return all todos", function(done) {
    var todos = TodoRepository.getTodos();  
    todos.then((results) => {
        assert.equal(results.length, 2);
        done();
    }); 
  });
});
