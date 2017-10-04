import * as b from 'bobril';
import { Button, ButtonType, grey500, Divider } from 'bobril-m';

export interface IHeaderData {
    userText: string;
    isSpeaking: boolean;
    startRecognition: () => void;
}

function createTitle(): b.IBobrilNode {
    return b.styledDiv('My To-Do list created by AI!', { fontSize: 32 });
}

function createTriggerForRecognition(startRecognition: () => void, isSpeaking: boolean): b.IBobrilNode {
    return b.styledDiv(Button({
        action: startRecognition,
        disabled: isSpeaking,
        type: ButtonType.Raised
    }, 'create new todo'), { display: 'inline-block' });
}

function createTextPreview(text: string): b.IBobrilNode {
    return b.styledDiv(b.styledDiv(text, {
        color: grey500,
        fontWeight: 'lighter',
        fontSize: 20,
        paddingLeft: 50,
        top: -27,
        position: 'absolute'
    }), {
            display: 'inline-block',
            position: 'relative',
            width: '70%'
        }
    );
}

export function Header(data: IHeaderData): b.IBobrilNode {
    return b.styledDiv([
        createTitle(),
        b.styledDiv([
            createTriggerForRecognition(data.startRecognition, data.isSpeaking),
            createTextPreview(data.userText)
        ], { paddingTop: 20, height: 50 }),
        Divider()
    ], { height: 150 });
}
