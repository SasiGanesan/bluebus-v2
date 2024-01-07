import express from 'express';

import {protect, admin} from '../middleware/authMiddleware.js'
import { createBus } from '../controllers/busController.js';

const router=express.Router();

router.post('/bus',admin, createBus)

export default router;


