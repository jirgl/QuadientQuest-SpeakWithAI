import * as b from 'bobril';
import { Paper } from 'bobril-m';
import { Header } from './components/header/header';
import { TodoList } from './components/todo/list';
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
                    items: store.items.map(item => {
                        return {
                            content: item.label,
                            isDone: item.isDone,
                            speak: () => store.speech(item.id),
                            markAsDone: () => store.markAsDone(item.id),
                            remove: () => store.remove(item.id)
                        }
                    })
                })
            ]
        );
    }
});
