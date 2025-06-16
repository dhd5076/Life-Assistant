import express from 'express';
import { connectDB } from './services/mongodbClient';
import memory from './services/mem0Client';
import chatRouter from './api/chat';

const app = express();
const PORT = process.env.PORT || 3000;

async function init() {
    console.log('Initializing server...');

    app.use(express.json());
    app.use('/api/chat', chatRouter);
    app.disable('x-powered-by');

    app.get('/', (req, res) => {
        res.send('Server running');
    });

    console.log('Connecting to MongoDB...');
    try {
        await connectDB();
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing server:', error);
        process.exit(1);
    }
}

init();