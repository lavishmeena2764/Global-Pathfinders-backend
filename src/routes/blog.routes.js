import { newBlog, getBlog, getBlogByTitle, deleteBlogById } from '../controllers/blog.controller.js';
import { Router } from 'express';
import fileUpload from '../middlewares/fileUpload.middleware.js';

const router = Router();

router.post('/upload', fileUpload, newBlog);
router.get('/', getBlog);
router.get('/:hash', getBlogByTitle);
router.delete('/:id', deleteBlogById);


export default router;