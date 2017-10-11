import * as sdk from './Speech.Browser.Sdk/index';

let recognizer: sdk.Recognizer;

export interface IRecognizer {
    recognize(onInputHandle: (text: string) => void, onFinish: () => void);
}

export function initialize(subscriptionKey: string): IRecognizer {
    const authentication = new sdk.CognitiveSubscriptionKeyAuthentication(subscriptionKey);
    const recognizerConfig = new sdk.RecognizerConfig(
        new sdk.SpeechConfig(
            new sdk.Context(
                new sdk.OS(navigator.userAgent, "Browser", null),
                new sdk.Device("SpeechSample", "SpeechSample", "1.0.00000")
            )
        )
    );

    recognizer = sdk.CreateRecognizer(recognizerConfig, authentication);
    return {
        recognize: startRecognize
    };
}

function startRecognize(onInputHandle: (text: string) => void, onFinish: () => void) {
    recognizer.Recognize((event: any) => {
        switch (event.Name) {
            case "SpeechHypothesisEvent":
                onInputHandle(event.Result.Text);
                break;
            case "RecognitionEndedEvent":
                onFinish();
                break;
        }
    }).On(() => { }, (error) => {
        console.error(error);
    });
}
