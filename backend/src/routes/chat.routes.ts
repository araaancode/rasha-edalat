import { Router } from 'express';
import { chatController } from '../controllers/chat.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { chatRateLimiter } from '../middlewares/rateLimiter.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/conversations', chatController.createConversation);
router.get('/conversations', chatController.getConversations);
router.get('/conversations/:id/messages', chatController.getMessages);
router.post('/conversations/:id/messages', chatRateLimiter, chatController.sendMessage);
router.put('/conversations/:id/close', chatController.closeConversation);

export default router;