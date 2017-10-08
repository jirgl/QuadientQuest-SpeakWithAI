export function speech(text) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.lang = 'en-US';

    speechSynthesis.speak(utterance);
}
