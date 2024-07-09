import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
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
      },
      body: {
        type: String,
        required: true
      }

  },
  { timestamps: true },
);

const Contact = model('contact', contactSchema);

export default Contact;