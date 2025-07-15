import "dotenv/config"; 

import InferenceHandler from "./InferenceHandler";

console.log(process.env.OPENAI_API_KEY);

const handler = new InferenceHandler(process.env.OPENAI_API_KEY || '');

handler.generateResponse([
    { role: 'user', content: 'Hello, how are you?' }
]).then(response => {
    console.log('AI Response:', response);
}).catch(error => {
    console.error('Error generating response:', error);
});