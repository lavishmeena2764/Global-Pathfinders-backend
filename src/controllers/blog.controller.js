
import express from 'express';
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
const app = express();
import {
  response_200,
  response_500,
} from '../utils/responseCodes.js';
import Blog from '../models/blog.model.js';

export async function newBlog(req, res) {
  const {
    title,
    body
  } = req.body;
  const titleHash = title.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').toLowerCase();
  const img = req.file;
  console.log(img);
  try {
    const fin = await Blog.findOne({titleHash:titleHash});
    if(fin) return res.status(500).json({ error: 'Title already exists!!' });
    const result = await cloudinary.uploader.upload(img.path);
    const blog = new Blog({
      title: title,
      titleHash: titleHash,
      img: result.url,
      body: body
    });
    const finalResult = await blog.save();
     fs.unlinkSync(img.path);
    return res.json({ blog: finalResult });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


export async function getBlog(req, res) {
  try {
    const finalResult = await Blog.find({}).sort({ createdAt: -1 });
    return response_200(res, 'Fetched all blogs!!', finalResult);
  } catch (error) {
    return response_500(res, 'Internal server error', error);
  }
}


export async function getBlogByTitle(req, res) {
  try {
    const hash = req.params.hash;
    const finalResult = await Blog.find({titleHash: hash});
    return response_200(res, 'Fetched blog!!', finalResult);
  } catch (error) {
    return response_500(res, 'Internal server error', error);
  }
}


export async function deleteBlogById(req, res) {
  try {
    const id = req.params.id;
    const finalResult = await Blog.findByIdAndDelete(id);
    return response_200(res, 'Deleted blog!!', finalResult);
  } catch (error) {
    return response_500(res, 'Internal server error', error);
  }
}
