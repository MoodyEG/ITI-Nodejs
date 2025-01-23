import Message from '../models/message.model.js';

class MessageController {
  static async getAll(req, res) {
    try {
      const messages = await Message.find({
        receiver: req.user._id,
      });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addMessage(req, res) {
    try {
      const { message, receiver } = req.body;

      const newMessage = await Message.create({
        message,
        receiver,
      });
      res.json(newMessage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteMessage(req, res) {
    try {
      const messageId = req.params.id;

      const deletedMessage = await Message.findOneAndDelete({
        _id: messageId,
        receiver: req.user._id,
      });
      if (!deletedMessage)
        return res.status(404).json({ error: 'Message not found' });
      res.json(deletedMessage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default MessageController;
