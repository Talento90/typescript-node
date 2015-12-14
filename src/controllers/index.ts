import * as Hapi from "hapi";
import TodoRepository from "./TodoController";

export default function (server: Hapi.Server){
    TodoRepository(server);
};