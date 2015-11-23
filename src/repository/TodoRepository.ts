import Todo from '../models/Todo';

var dummyTodos = [
	new Todo("Todo 1", "Description bla bla 1"),
	new Todo("Todo 2", "Description bla bla 2")
];

export function getTodos(): Promise<Array<Todo>> {
	return new Promise<Array<Todo>>((resolve, reject) => {
		resolve(dummyTodos);
	});
}