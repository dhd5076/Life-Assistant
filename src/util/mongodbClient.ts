import mongoose from 'mongoose';
import { config } from '../config'

if(!config.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
    } catch (error) {
        throw error;
        process.exit(1);
    }
};