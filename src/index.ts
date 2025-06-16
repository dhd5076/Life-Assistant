import express from 'express';
import { connectDB } from './services/mongodbClient';

const app = express();
const PORT = process.env.PORT || 3000;

async function init() {
    console.log('Initializing server...');
    app.use(express.json());
    app.disable('x-powered-by');

    app.get('/', (req, res) => {
        res.send('Server running');
    });

    console.log('Connecting to MongoDB...');
    connectDB()
        .then(() => {
            console.log('MongoDB connected successfully');
            app.listen(PORT, () => {
                console.log(`Server is listening on port ${PORT}`);
            })
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
    });
}

init()
.catch((error) => {
    console.error('Error during initialization:', error);
    process.exit(1);
});
