import express from 'express';
import { v2 as cloudinary } from "cloudinary";
const app = express();
import {
  response_200,
  response_500,
} from '../utils/responseCodes.js';
import Event from '../models/event.model.js';

export async function newEvent(req, res) {
  const {
    title,
    caption,
    date,
    time,
    venue,
    link
  } = req.body;
  console.log(req.body);

  if (!req.file) {
    return res.status(500).json({message:'No file uploaded'});
  }

  const filePath = req.file.path;
  try {
    console.log("working")
    const result = await cloudinary.uploader.upload(filePath);
    console.log("working")
    const event = new Event({
      title: title,
      caption: caption,
      date:  date,
      time: time,
      venue: venue,
      link: link,
      img: result.url
    });
    const finalResult = await event.save();
    console.log(finalResult)
    return res.json({ event: finalResult });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

}


export async function getEvent(req, res) {
  try {
    const finalResult = await Event.find().sort({ createdAt: -1 });
    return response_200(res, 'Fetched all events!!', finalResult);
  } catch (error) {
    return response_500(res, 'Internal server error', error);
  }
}


export async function deleteEventById(req, res) {
  try {
    const id = req.params.id;
    const finalResult = await Event.findByIdAndDelete(id);
    return response_200(res, 'Deleted event!!', finalResult);
  } catch (error) {
    return response_500(res, 'Internal server error', error);
  }
}
  


export async function editEvent(req, res) {
  const {
    title,
    caption,
    date,
    time,
    venue,
    link
  } = req.body;

  // console.log(req.body);

  try {
    let updatedFields = { title, caption, date, time, venue, link };
    // console.log(updatedFields)
    // Check if a new file is uploaded
    if (req.file) {
      const filePath = req.file.path;
      const result = await cloudinary.uploader.upload(filePath);
      updatedFields.img = result.url; // Update image URL
    }

    // Find the event by ID and update it with the new fields
    const event = await Event.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.json({ event });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

