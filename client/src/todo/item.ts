import * as b from 'bobril';
import { Button } from 'bobril-m';
import { avVolumeUp } from 'bobril-m-icons';

export interface ITodoItemData {
    content: string;
    speak: () => void;
}

function createText(text: string): b.IBobrilNode {
    return b.styledDiv(b.styledDiv(text, {
        paddingLeft: 10,
        top: -34,
        position: 'absolute'
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
        createText(data.content)
    ], { height: 50, fontSize: 20 });
}
