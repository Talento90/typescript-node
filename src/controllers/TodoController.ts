import express = require("express");
import repository = require("../repository/TodoRepository");

export function GetAllTodos(req: express.Request, res: express.Response) {
	repository.getTodos().then((todos) => {
		res.send(todos);
	});
};