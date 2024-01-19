import express from 'express';
import { createTicket, getTicketById, cancelTickets,getAllTickets} from "../controllers/ticketController.js";
import { checkAuth } from '../middleware/authMiddleware.js';

const router=express.Router();

router.post('/ticket/:trip_id',createTicket)
router.get('',getAllTickets)
router.route('/:id').get(checkAuth,getTicketById).put(checkAuth,cancelTickets)

export default router;
