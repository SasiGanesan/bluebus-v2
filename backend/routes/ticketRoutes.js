import express from 'express';

import { createTicket} from "../controllers/ticketController.js";

const router=express.Router();

router.post('/ticket/:trip_id',createTicket)


export default router;
