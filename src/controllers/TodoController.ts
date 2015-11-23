import * as express from "express";
import * as repository from "../repository/TodoRepository";

export function GetAllTodos(req: express.Request, res: express.Response) {
	repository.getTodos().then((todos) => {
		res.send(todos);
	});
};