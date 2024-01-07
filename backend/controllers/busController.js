import asyncHandler from "../middleware/asyncHandler";

import {userId} from '..middleware/authMiddleware';

const createBus = asyncHandler(async(req,res)=>{
    try{
        const {busNumber,busSeats,isSleeper}=req.body
        if(!busNumber || !busSeats){
            return res.status(400).json({
                message: "Invalid data"
            })
        }

        
        const bus= await addBus(userId,busNumber,busSeats,isSleeper)
        res.status(200).json({
            userId:bus.userId,
            busNumber:bus.busSeats,
            isSleeper:bus.isSleeper
        })
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

export { createBus }