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
    recognizer.Recognize((event: any) => { //TODO any
        /*
            Alternative syntax for typescript devs.
            if (event instanceof SDK.RecognitionTriggeredEvent)
        */
        switch (event.Name) {
            case "RecognitionTriggeredEvent":
                console.log('Initializing');
                // UpdateStatus("Initializing");
                break;
            case "ListeningStartedEvent":
                console.log('Listening');
                // UpdateStatus("Listening");
                break;
            case "RecognitionStartedEvent":
                console.log('Listening_Recognizing');
                // UpdateStatus("Listening_Recognizing");
                break;
            case "SpeechStartDetectedEvent":
                console.log('Listening_DetectedSpeech_Recognizing');
                // UpdateStatus("Listening_DetectedSpeech_Recognizing");
                console.log(JSON.stringify(event.Result)); // check console for other information in result
                break;
            case "SpeechHypothesisEvent":
                console.log('SpeechHypothesisEvent');
                // UpdateRecognizedHypothesis(event.Result.Text);
                console.log(JSON.stringify(event.Result)); // check console for other information in result
                onInputHandle(event.Result.Text);
                break;
            case "SpeechEndDetectedEvent":
                console.log('SpeechEndDetectedEvent');
                // OnSpeechEndDetected();
                // UpdateStatus("Processing_Adding_Final_Touches");
                console.log(JSON.stringify(event.Result)); // check console for other information in result
                break;
            case "SpeechSimplePhraseEvent":
                console.log('SpeechSimplePhraseEvent');
                // UpdateRecognizedPhrase(JSON.stringify(event.Result, null, 3));
                break;
            case "SpeechDetailedPhraseEvent":
                console.log('SpeechDetailedPhraseEvent');
                // UpdateRecognizedPhrase(JSON.stringify(event.Result, null, 3));
                break;
            case "RecognitionEndedEvent":
                console.log('RecognitionEndedEvent');
                // OnComplete();
                // UpdateStatus("Idle");
                console.log(JSON.stringify(event)); // Debug information
                onFinish();
                break;
        }
    }).On(() => { }, (error) => {
        console.error(error);
    });
}
