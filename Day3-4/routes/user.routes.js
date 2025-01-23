import express from 'express';
import UserController from '../controllers/user.controller.js';
import verifyInput from '../middleware/verify.middleware.js';
import { upload } from '../utilities/mutler.storage.js';

const router = express.Router();

router.post(
  '/register',
  upload.single('avatar'),
  verifyInput,
  UserController.register
);
router.post('/login', verifyInput, UserController.login);

export default router;
