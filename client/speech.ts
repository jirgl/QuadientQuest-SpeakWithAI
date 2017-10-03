import * as sdk from './Speech.Browser.Sdk';

function setup(): sdk.Recognizer {
    const authentication = new sdk.CognitiveSubscriptionKeyAuthentication(subscriptionKey);
    const recognizerConfig = new sdk.RecognizerConfig(
        new sdk.SpeechConfig(
            new sdk.Context(
                new sdk.OS(navigator.userAgent, "Browser", null),
                new sdk.Device("SpeechSample", "SpeechSample", "1.0.00000")
            )
        )
    );

    return new sdk.Recognizer(authentication, new sdk.SpeechConnectionFactory(), undefined, recognizerConfig);
}

function RecognizerStart() {
    const recognizer = setup();
    recognizer.Recognize((event) => {
    });
}
