import "dotenv/config"; 

import Logger from "./Logger";

import InferenceHandler from "./InferenceHandler";

const Log = new Logger();

const handler = new InferenceHandler(process.env.OPENAI_API_KEY || '');

handler.generateResponse([
    { role: 'user', content: 'Hello, how are you?' }
]).then(response => {
    Log.log("Sent message to OpenAI: Hello, how are you?");
}).catch(error => {
    console.error('Error generating response:', error);
});