import { Router } from 'express';
import MessageController from '../controllers/message.controller.js';
import verifyInput from '../middleware/verify.middleware.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.get('/getall', authMiddleware, MessageController.getAll);
router.post('/addmessage', verifyInput, MessageController.addMessage);
router.delete(
  '/deletemessage/:id',
  authMiddleware,
  MessageController.deleteMessage
);

export default router;
