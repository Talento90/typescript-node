import Todo from "../models/Todo";
import Linq from "linqsharp";

var todoData = [
	new Todo(1, "Todo 1", "Description bla bla 1"),
	new Todo(2, "Todo 2", "Description bla bla 2")
];

export function getAllTodos(): Promise<Array<Todo>> {
	return new Promise<Array<Todo>>((resolve, reject) => {
		resolve(todoData);
	});
}
export function getTodoById(id: number): Promise<Todo> {
	return new Promise<Todo>((resolve, reject) => {		
		var todo: Todo = new Linq<Todo>(todoData).FirstOrDefault(t => t.Id == id);
		resolve(todo);
	});
}

export function createTodo(todo: Todo): Promise<Todo> {
	return new Promise<Todo>((resolve, reject) => {
		todoData.push(todo);
		resolve(todo);
	});
}