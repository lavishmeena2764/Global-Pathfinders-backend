// import handler (controller) functions to route them
import { logIn } from '../controllers/auth.controller.js';
import { Router } from 'express';
const router = Router();

router.post('/login', logIn);
  
export default router;