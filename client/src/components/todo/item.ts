import * as b from 'bobril';
import { Button, green500 } from 'bobril-m';
import { avVolumeUp, navigationCheck, navigationClose } from 'bobril-m-icons';

export interface ITodoItemData {
    content: string;
    isDone: boolean;
    markAsDone: () => void;
    speak: () => void;
    remove: () => void;
}

function createText(text: string, isDone: boolean): b.IBobrilNode {
    return b.styledDiv(b.styledDiv(text, {
        paddingLeft: 10,
        top: -34,
        position: 'absolute',
        color: isDone ? green500 : undefined
    }), {
            display: 'inline-block',
            position: 'relative',
        }
    );
}

export function TodoItem(data: ITodoItemData): b.IBobrilNode {
    return b.styledDiv([
        Button({
            action: data.speak
        }, avVolumeUp()),
        Button({
            action: data.markAsDone,
            disabled: data.isDone
        }, navigationCheck()),
        Button({
            action: data.remove
        }, navigationClose()),
        createText(data.content, data.isDone)
    ], { height: 50, fontSize: 20 });
}
