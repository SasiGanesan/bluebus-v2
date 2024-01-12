import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import Trip from "../model/tripModel.js";

//create trip

const createTrip = asyncHandler(async(req,res)=>{
   
        const { busNumber,origin,destination,departureTime,arrivalTime,fare,availableSeats,date } = req.body;
        try{
        //check trip using busNumber and date
        const existingTrip = await Trip.findOne({busNumber, date});
        if(existingTrip){
            return res.status(400).json({message: 'This trip already exists'});
        }
        //Create a new trip
        const trip=await Trip.create({
            busNumber,
            origin,
            destination,
            date,
            departureTime,
            arrivalTime,  
            fare,
            availableSeats,
           
        })
           return res.status(200).json({
                busNumber:trip.busNumber,
                origin:trip.origin,
                destination:trip.destination,
                date:trip.date,
                departureTime:trip.departureTime,
                arrivalTime:trip.arrivalTime,
                fare:trip.fare,
                availableSeats:trip.availableSeats,
                
            })
        
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
})

//Get Trip by id
const getTripById =asyncHandler(async(req,res)=>{
    try {
        const trip=await Trip.findById(req.params.id)
        if(trip){       
          res.status(200).json(trip);
        }else{
            res.status(404).json({
                message: "Trip not found"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Invalid Trip Id' });
    }
    
    
})



export { createTrip,getTripById }
