import { userId } from '../middleware/authMiddleware.js';
//import Trip from '../model/tripModel.js';
//import Ticket from "../model/ticketModel.js";
import {checkSeatExist,findTripById,bookTicket,UpdateTrip } from '../service/ticketService.js';
//import mongoose from 'mongoose';

//create Ticket
const createTicket=async(req,res)=>{
    const {passengers}=req.body;
    const {trip_id} = req.params;
    //console.log(trip_id)

    try {   
        //Find the trip
        const trip=await findTripById(trip_id);
        
        if(!trip){
            return res.status(404).json({message: 'Trip not found'})
        }

        const user_id = userId(req)
        const busNumber = trip.busNumber;
        const bookingDate = new Date;
        const origin = trip.origin;
        const destination = trip.destination;
        const date = trip.date;
        const departureTime = trip.departureTime;
        const arrivalTime = trip.arrivalTime;
        const numberOfSeats = passengers.length;
        const totalPrice = passengers.length * trip.fare;

        // Check seat availability
        const seatNumbers = passengers.map(passenger => passenger.seatNumber);
        const seatExists = await checkSeatExist(trip_id,seatNumbers);
        if (seatExists) {
            return res.status(400).json({ message: 'seats already booked' });
        }

       
            //Create a new ticket
        const ticket = await bookTicket({
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
            totalPrice
        });

        const updateTrip = await UpdateTrip(trip_id, numberOfSeats, seatNumbers);
    
        if (!updateTrip) {
            return res.status(500).json({ message: 'Cannot to update trip' });
        }

         res.status(201).json({
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
}


export{createTicket}