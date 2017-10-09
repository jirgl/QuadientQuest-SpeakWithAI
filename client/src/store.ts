import * as b from 'bobril';
import { observable } from 'bobx';
import { initialize, IRecognizer } from '../lib/speechToTextApi';
import { speech as textToSpeech } from '../lib/textToSpeechApi';
import * as api from './api/endpoints';

class Store {
    @observable private _userText: string;
    @observable private _isUserSpeaking: boolean;
    private _items = observable.map<number, api.ITodo>();
    private recognizer: IRecognizer;
    private placeholder = 'listening...';
    private idCounter = 0;

    constructor() {
        api.getSubscription().then(subscription => {
            this.recognizer = initialize(subscription.key);
        });
        api.getTodos().then(todos => {
            todos.forEach(todo => {
                this._items.set(todo.id, todo);
            });
        });
    }

    get userText(): string {
        return this._userText;
    }

    get isUserSpeaking(): boolean {
        return this._isUserSpeaking;
    }

    get items(): api.ITodo[] {
        const items: api.ITodo[] = [];
        this._items.forEach(value => {
            items.push(value);
        });

        return items;
    }

    createNewItem = () => {
        if (!this.recognizer)
            return;

        this._isUserSpeaking = true;
        this._userText = this.placeholder;
        this.recognizer.recognize(this.setUserText, this.saveNewItem);
    }

    speech = (id: number) => {
        let text: string;
        const index = this._items.forEach(item => {
            if (item.id === id) {
                text = item.label;
                return;
            }
        });
        textToSpeech(text);
    }

    markAsDone = (id: number) => {
        this._items.forEach(item => {
            if (item.id === id) {
                item.isDone = true;
                api.updateTodo(item);
                return;
            }
        });
    }

    remove = (id: number) => {
        this._items.delete(id);
        api.removeTodo(id);
    }

    private setUserText = (text: string) => {
        this._userText = text;
    }

    private saveNewItem = () => {
        if (this._userText !== this.placeholder) {
            const todo = {
                id: this.idCounter,
                label: this._userText,
                isDone: false
            };
            this._items.set(this.idCounter, todo);
            api.addTodo(todo)
        }

        this._userText = '';
        this._isUserSpeaking = false;
        this.idCounter++;
    }
}

export const store = new Store();
