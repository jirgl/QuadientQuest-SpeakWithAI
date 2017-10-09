import * as b from 'bobril';
import { TodoItem, ITodoItemData } from './item';

export interface ITodoListData {
    items: ITodoItemData[];
}

export function TodoList(data: ITodoListData): b.IBobrilNode[] {
    return data.items.map(item => TodoItem(item));
}
