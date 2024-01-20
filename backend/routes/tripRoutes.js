import express from 'express';
import {protect,admin} from '../middleware/authMiddleware.js'
import { busOwner } from '../middleware/busMiddleware.js';
import { createTrip ,getTripById,searchBus } from '../controllers/tripcontrollers.js';
import {searchBusValidation,tripValidation} from '../middleware/validationMiddleware.js'


const router=express.Router();

router.post('/trip',protect,tripValidation,admin,busOwner, createTrip)
router.get('',searchBusValidation, searchBus)
router.get('/:id',getTripById)
export default router;
