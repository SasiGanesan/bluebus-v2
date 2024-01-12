import asyncHandler from '../middleware/asyncHandler.js';
import { userId } from '../middleware/authMiddleware.js';
import Trip from '../model/tripModel.js';
import Ticket from "../model/ticketModel.js";
//import mongoose from 'mongoose';

//create Ticket
const createTicket=asyncHandler(async(req,res)=>{

    const{
        user_id,
        trip_id,
        busNumber,
        bookingDate,
        passengers,
        numberOfSeats,
        date,
        departureTime,
        arrivalTime,
        origin,
        destination,
        totalPrice,
      }=req.body

    try {   
        const {passengers}=req.body;
        const {trip_id} = req.params;
        console.log(trip_id)


        // if (!mongoose.Types.ObjectId.isValid(trip_id)) {
        //     return res.status(400).json({ message: 'Invalid trip_id format' });
        // }

        //Find the trip
        const trip=await Trip.findById(trip_id);
        
        if(!trip){
            return res.status(404).json({message: 'Trip not found'})
        }

        // Check seat availability
        const seatNumbers = passengers.map(passenger => passenger.seatNumber);
        const seatExists = await Ticket.findOne({ trip_id, seatNumber: { $in: seatNumbers } });
        if (seatExists) {
            return res.status(400).json({ message: 'seats already booked' });
        }

        // Calculate total price
        const totalPrice = passengers.length * trip.fare;
 
            //Create a new ticket
        const ticket = await Ticket.create({
            user_id: userId(req),
            trip_id,
            busNumber: trip.busNumber,
            bookingDate: new Date(),
            numberOfSeats: passengers.length,
            date: trip.date,
            departureTime: trip.departureTime,
            arrivalTime: trip.arrivalTime,
            origin: trip.origin,
            destination: trip.destination,
            totalPrice
        });

        return res.status(201).json({
            trip: ticket.trip_id,
            user: ticket.user_id,
            busNumber: ticket.busNumber,
            bookingDate: ticket.bookingDate,
            numberOfSeats: ticket.numberOfSeats,
            date: ticket.date,
            departureTime: ticket.departureTime,
            arrivalTime: ticket.arrivalTime,
            origin: ticket.origin,
            destination: ticket.destination,
            totalPrice})
    }catch (error) {
        res.status(500).json({message:'Ticket not created'})
        console.log(error.message);
    }
})


export{createTicket}