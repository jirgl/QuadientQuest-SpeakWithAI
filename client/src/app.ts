import * as b from 'bobril';
import { Paper } from 'bobril-m';
import { Header } from './header/header';
import { TodoList } from './todo/list';
import { store } from './store';

export interface IAppData { }

interface IAppCtx extends b.IBobrilCtx {
    data: IAppData;
}

export const App = b.createComponent<IAppData>({
    render(ctx: IAppCtx, me: b.IBobrilNode) {
        const d = ctx.data;
        me.children = Paper(
            {
                style: { padding: 50 },
                zDepth: 0
            },
            [
                Header({
                    userText: store.userText,
                    isSpeaking: store.isUserSpeaking,
                    startRecognition: store.createNewItem
                }),
                TodoList({
                    items: store.items
                })
            ]
        );
    }
});