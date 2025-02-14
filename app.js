import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:['https://www.globalpathfinders.co.in','https://globalpathfinders.co.in']
}));

import connDB from './src/config/db.config.js';
connDB();

import cloud from './src/config/cloudinary.config.js';
cloud();

import authRoutes from './src/routes/auth.routes.js';
app.use('/', authRoutes);

import blogRoutes from './src/routes/blog.routes.js';
app.use('/blog', blogRoutes);

import eventRoutes from './src/routes/event.routes.js';
app.use('/event', eventRoutes);

import contactRoutes from './src/routes/contact.routes.js';
app.use('/contact', contactRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
  });

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}!`);
});
