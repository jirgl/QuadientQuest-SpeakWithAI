import * as b from 'bobril';
import { observable } from 'bobx';
import { subscriptionKey } from './settings';
import { initialize, IRecognizer } from '../lib/speechToTextApi';
import { speech as textToSpeech } from '../lib/textToSpeechApi';

class Store {
    @observable private _userText: string;
    @observable private _isUserSpeaking: boolean;
    @observable private _items: string[] = [];
    private recognizer: IRecognizer;
    private palceholder = 'listening...';

    constructor() {
        this.recognizer = initialize(subscriptionKey);
    }

    get userText(): string {
        return this._userText;
    }

    get isUserSpeaking(): boolean {
        return this._isUserSpeaking;
    }

    get items(): string[] {
        return this._items;
    }

    createNewItem = () => {
        this._isUserSpeaking = true;
        this._userText = this.palceholder;
        this.recognizer.recognize(this.setUserText, this.saveNewItem);
    }

    speech = (item: string) => {
        textToSpeech(item);
    }

    private setUserText = (text: string) => {
        this._userText = text;
    }

    private saveNewItem = () => {
        if (this._userText !== this.palceholder)
            this._items.push(this._userText);

        this._userText = '';
        this._isUserSpeaking = false;
    }
}

export const store = new Store();
