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

export function getTodos(onLoad: (data: ITodo[]) => void) {
    return callGet('/getTodos', onLoad);
}

export function removeTodo(todoId: number) {
    callPost('/removeTodo', { id: todoId });
}

export function getSubscription(onLoad: (data: ISubscription) => void) {
    return callGet('/subscription', onLoad);
}
