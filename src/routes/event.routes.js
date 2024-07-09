import { newEvent, getEvent, deleteEventById, editEvent } from '../controllers/event.controller.js';
import { Router } from 'express';
import fileUpload from '../middlewares/fileUpload.middleware.js';

const router = Router();

router.post('/upload', fileUpload , newEvent);
router.get('/', getEvent);
router.delete('/:id', deleteEventById);
router.put('/update/:id', editEvent);

export default router;