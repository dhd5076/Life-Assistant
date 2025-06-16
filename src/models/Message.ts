import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  processed: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date() }
});

export default mongoose.model('Message', messageSchema);