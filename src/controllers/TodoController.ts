import * as Hapi from "hapi";
import * as Joi from "joi";
import * as Boom from "boom";
import * as TodoRepository from "../repository/TodoRepository";
import Todo from '../models/Todo';

export default function (server: Hapi.Server){
    
    server.route({
        method: 'GET',
        path: '/api/todos',
        handler: function (request: Hapi.Request, reply: Hapi.IReply) {                     
            TodoRepository.getAllTodos()
                .then((todos: Array<Todo>) => {                  
                    reply(todos);
                });        
        }
    });
     
    server.route({
        method: 'GET',
        path: '/api/todos/{id}',
        handler: function (request: Hapi.Request, reply: Hapi.IReply) {
            var params: any = request.params;
         
            TodoRepository.getTodoById(params.id)
                .then((todo: Todo) => {
                    if(todo)
                        reply(todo);
                    else
                        reply(Boom.notFound());
                });        
        },
        config: {
            validate: {
                params: {
                    id: Joi.number(),
                }   
            }
        }
    });
     
    server.route({
        method: 'POST',
        path: '/api/todos',
        handler: function (request: Hapi.Request, reply: Hapi.IReply) {         
            var todo = new Todo(request.payload.id, request.payload.name, request.payload.description);
            
            TodoRepository.createTodo(todo)
                .then((todo: Todo) => {
                    reply(todo).code(201);
                });        
        },
        config: {
            validate: {
                payload: {
                    id: Joi.number().required(),
                    name: Joi.string().required(),
                    description: Joi.string().required().min(10)
                }   
            }
        }
    });
};