import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export default async function authMiddleware(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'Unauthorized' });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized', message: error.message });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
