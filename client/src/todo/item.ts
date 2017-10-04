import * as b from 'bobril';

export interface ITodoItemData {
    content: string;
}

export function TodoItem(data: ITodoItemData): b.IBobrilNode {
    return b.styledDiv(data.content, { height: 30, fontSize: 20 });
}
