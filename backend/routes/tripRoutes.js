import express from 'express';
import {protect,admin} from '../middleware/authMiddleware.js'
import { busOwner } from '../middleware/busMiddleware.js';
import { createTrip ,getTripById } from '../controllers/tripcontrollers.js';

const router=express.Router();

router.post('/trip',protect,admin,busOwner, createTrip)
router.get('/:id',getTripById)
export default router;