import { OpenAI } from 'openai';

export default class InferenceHandler {
    OpenAIClient: OpenAI;
    OpenAIKey: string;

    constructor(OpenAIKey: string) {
        this.OpenAIKey = OpenAIKey;

        this.OpenAIClient = new OpenAI({
            apiKey: this.OpenAIKey
        });
    }

    generateResponse(messages: [any]): Promise<string> {
        return new Promise((resolve, reject) => {
            this.OpenAIClient.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages,
                max_tokens: 150
            })
            .then(completion => {
                resolve(completion.choices[0].message.content || '');
            })
        })
    }
}