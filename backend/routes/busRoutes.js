import express from 'express';

import {protect, admin} from '../middleware/authMiddleware.js'
import { createBus } from '../controllers/busController.js';
import { createBusValidation } from '../middleware/validationMiddleware.js';


const router=express.Router();

router.post('/bus',protect,admin,createBusValidation,createBus)


export default router;


