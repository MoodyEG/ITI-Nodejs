import MessageController from '../controllers/message.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/getall', MessageController.getAll);
router.post('/addmessage', MessageController.addMessage);
router.delete('/deletemessage/:id', MessageController.deleteMessage);

export default router;
