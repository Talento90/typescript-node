/// <reference path="../typings/tsd.d.ts" />

import assert = require("assert");
import Greeter = require("../src/greeter");

describe("greeter", function () {
  it("should greet with message", function () {
    var greeter = new Greeter('Talento');
    assert.equal(greeter.greet(), "Olá, Talento!");
  });
});
