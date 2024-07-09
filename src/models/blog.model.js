import { Schema, model } from 'mongoose';

const blogSchema = new Schema(
  {
    title: {
        type: String,
        required: true
      },
      titleHash: {
        type: String,
        required: true,
        unique: true
      },
      body: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
        default: "https://globalpathfinders.co.in/assets/images/logo.png"
      }

  },
  { timestamps: true },
);

const Blog = model('blog', blogSchema);

export default Blog;