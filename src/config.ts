import dotenv from 'dotenv';
dotenv.config();

export const config = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    WEAVIATE_URL: process.env.WEVIATE_URL || '',
    WEAIATE_API_KEY: process.env.WEVIATE_API_KEY || '',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://192.168.1.1:27017'
}