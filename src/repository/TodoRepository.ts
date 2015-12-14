import Todo from '../models/Todo';

var todoData = [
	new Todo("Todo 1", "Description bla bla 1"),
	new Todo("Todo 2", "Description bla bla 2")
];


export function getAllTodos(): Promise<Array<Todo>> {
	return new Promise<Array<Todo>>((resolve, reject) => {
		resolve(todoData);
	});
}

export function getTodoById(int: number): Promise<Todo> {
	return new Promise<Todo>((resolve, reject) => {
		resolve(todoData[int]);
	});
}

export function createTodo(todo: Todo): Promise<Todo> {
	return new Promise<Todo>((resolve, reject) => {
		todoData.push(todo);
		resolve(todo);
	});
}