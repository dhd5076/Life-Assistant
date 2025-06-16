import express from 'express';
import Message from '../models/Message';

const router = express.Router();

router.post('/', (req: express.Request, res: express.Response): void => {
  (async () => {
    try {
      const { role, content } = req.body;

      if (!role || !content) {
        return res.status(400).json({ error: 'Missing role or content' });
      }

      const message = new Message({ role: String(role), content: String(content) });
      await message.save();

      res.status(201).json(message);
    } catch (err) {
      console.error('Error saving message:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })().catch(err => {
    console.error(err);
  });
});

export default router;