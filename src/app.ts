/// <reference path="../typings/tsd.d.ts" />

import express = require('express');
import TodoController = require("./controllers/TodoController");

var port = process.env.port || 3001;
var app = express();

app.get('/api/todos', TodoController.GetAllTodos);

var server = app.listen(port, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
