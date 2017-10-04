import * as b from 'bobril';
import { TodoItem } from './item';

export interface ITodoListData {
    items: string[];
}

export function TodoList(data: ITodoListData): b.IBobrilNode[] {
    return data.items.map(item => TodoItem({
        content: item
    }));
}
