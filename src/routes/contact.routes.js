import { newForm, getContact, newCallBackForm, getCallBack } from '../controllers/contact.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', getContact);
router.post('/', newForm);
router.post('/callback', newCallBackForm);
router.get('/callback', getCallBack);

export default router;