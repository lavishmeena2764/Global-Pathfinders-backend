import express from 'express';
import nodemailer from 'nodemailer';
const app = express();
import {
  response_200,
  response_500,
} from '../utils/responseCodes.js';
import Contact from '../models/contact.model.js';
import CallBack from '../models/callBack.model.js';

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Replace with your email
    pass: process.env.PASS, // Replace with your email password or app password
  },
});

// Function to send email
const sendEmail = async (subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL, // Replace with your email
    to: process.env.EMAILR, // Replace with recipient email
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export async function newForm(req, res) {
  const { name, email, phone, subject, body } = req.body;
  try {
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      body,
    });
    const finalResult = await contact.save();

    // Send email notification
    const emailContent = `
      <h1>Website Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${body}</p>
    `;
    await sendEmail('Website Contact Form Submission', emailContent);

    return res.json({ contact: finalResult });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function newCallBackForm(req, res) {
  const { name, email, phone, subject } = req.body;
  try {
    const callback = new CallBack({
      name,
      email,
      phone,
      subject,
    });
    const finalResult = await callback.save();

    // Send email notification
    const emailContent = `
      <h1>Website Callback Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
    `;
    await sendEmail('Website Callback Form Submission', emailContent);

    return res.json({ contact: finalResult });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getContact(req, res) {
  try {
    const finalResult = await Contact.find({}).sort({ createdAt: -1 });
    return response_200(res, 'Fetched all Queries!!', finalResult);
  } catch (error) {
    return response_500(res, 'Internal server error', error);
  }
}

export async function getCallBack(req, res) {
  try {
    const finalResult = await CallBack.find({}).sort({ createdAt: -1 });
    return response_200(res, 'Fetched all Callback Queries!!', finalResult);
  } catch (error) {
    return response_500(res, 'Internal server error', error);
  }
}
