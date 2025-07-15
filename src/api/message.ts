import express from 'express';
import Message from '../models/Message';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { config } from '../config';
import memory from '../util/mem0Client'; // Adjust this import path as needed

const router = express.Router();

const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY,
});

async function saveMemoryFromRecentMessages() {
    try {
        const recentMessages = await Message.find().sort({ createdAt: -1 }).limit(10);
        const formatted = recentMessages.reverse().map(msg => ({
            role: msg.role as "user" | "system" | "assistant",
            content: msg.content,
        }));

        console.log(formatted)

        await memory.add(formatted, {
            userId: 'dylan',
            agentId: 'karen',
            metadata: { purpose: 'chatgpt_tool_triggered' }
        });

        console.log('Memory saved successfully');
    } catch (err) {
        console.error('Failed to save memory:', err);
    }
}

router.post('/', async (req, res) => {
    try {
        const { role, content } = req.body;

        // Save user message
        const userMessage = new Message({ role, content });
        await userMessage.save();

        // Generate ChatGPT reply
        const recentDbMessages = await Message.find().sort({ createdAt: -1 }).limit(20);
        const formattedMessages = recentDbMessages.reverse().map(msg => ({
            role: msg.role as "user" | "system" | "assistant",
            content: msg.content,
        }) as ChatCompletionMessageParam);

        let memoryMessages: ChatCompletionMessageParam[] = [];
        try {
            const memorySearch = await memory.search(req.body.content, { userId: 'dylan', agentId: 'karen' });
            memoryMessages = memorySearch.results.map(result => ({
                role: 'system' as "system",
                content: result.memory,
            }) as ChatCompletionMessageParam);
            console.log(memoryMessages);
        } catch (err) {
            console.warn('Failed to inject memory context:', err);
        }

        const allContext = [...memoryMessages, ...formattedMessages]
          .filter(
            (msg): msg is ChatCompletionMessageParam =>
              msg && typeof msg.role === 'string' && typeof msg.content === 'string'
          );

        const chatResponse = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: allContext,
        });

        const assistantContent = chatResponse.choices[0].message.content || 'Sorry, I could not generate a response.';
        const assistantMessage = new Message({ role: 'assistant', content: assistantContent });
        await assistantMessage.save();


        // Check total messages and trigger memory save every 10 messages
        const totalMessages = await Message.countDocuments();
        if (totalMessages % 10 === 0 || totalMessages % 1 === 0) {
            await saveMemoryFromRecentMessages();
        }

        res.status(201).json([assistantMessage]);
    } catch (error) {
        console.error('Error saving message or generating response:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
});

export default router;