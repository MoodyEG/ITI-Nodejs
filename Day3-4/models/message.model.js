import { model, Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    message: { type: String, required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Message = model('Message', messageSchema);

export default Message;
