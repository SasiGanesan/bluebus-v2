import express from 'express';

import { createTicket, findTicket} from "../controllers/ticketController.js";

const router=express.Router();

router.post('/ticket/:trip_id',createTicket)
router.route('/:id').get(findTicket)

export default router;
