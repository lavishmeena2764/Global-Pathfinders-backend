import { Schema, model } from 'mongoose';

const callBackSchema = new Schema(
  {
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      subject: {
        type: String,
        required: true
      }
  },
  { timestamps: true },
);

const CallBack = model('callback', callBackSchema);

export default CallBack;