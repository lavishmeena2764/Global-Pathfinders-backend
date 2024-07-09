import { Schema, model } from 'mongoose';

const eventSchema = new Schema(
  {
    title: {
        type: String,
        required: true
      },
      caption: {
        type: String
      },
      date: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      venue: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      },
      img: {
        type: String,
        required: true, // Assuming img is optional
        default: "https://globalpathfinders.co.in/assets/images/logo.png"
      }

  },
  { timestamps: true },
);

const Event = model('event', eventSchema);

export default Event;