import { callGet, callPost } from './base';

export interface ITodo {
    id: number;
    label: string;
    isDone: boolean;
}

export interface ISubscription {
    key: string;
}

export function addTodo(todo: ITodo) {
    callPost('/addTodo', todo);
}

export function updateTodo(todo: ITodo) {
    callPost('/updateTodo', todo);
}

export function getTodos(): Promise<ITodo[]> {
    return callGet('/getTodos');
}

export function removeTodo(todoId: number) {
    callPost('/removeTodo', { id: todoId });
}

export function getSubscription(): Promise<ISubscription> {
    return callGet('/subscription');
}
