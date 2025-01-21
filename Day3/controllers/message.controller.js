import Message from '../models/message.model.js';

class MessageController {
  static async getAll(req, res) {
    // TODO check for jwt
    try {
      const messages = await Message.find().select('-sender');
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addMessage(req, res) {
    try {
      const { message, sender, receiver } = req.body;
      if (!message)
        return res.status(422).json({ error: 'Message is required' });
      if (!sender) return res.status(422).json({ error: 'Sender is required' });
      if (!receiver)
        return res.status(422).json({ error: 'Receiver is required' });
      const newMessage = await Message.create({
        message,
        sender,
        receiver,
      });
      res.json(newMessage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteMessage(req, res) {
    try {
      const id = req.params.id;

      const deletedMessage = await Message.findByIdAndDelete(id);
      if (!deletedMessage)
        return res.status(404).json({ error: 'Message not found' });
      res.json(deletedMessage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default MessageController;
