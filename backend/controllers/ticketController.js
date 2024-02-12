import { userId } from '../middleware/authMiddleware.js';
// import Trip from '../model/tripModel.js';
// import Ticket from "../model/ticketModel.js";
import {checkSeatExist,findTripById,bookTicket,UpdateTrip,findTicketById, cancelTicket,updatedTrip,getTickets } from '../service/ticketService.js';
//import mongoose from 'mongoose';

//create Ticket
const createTicket=async(req,res)=>{
    const {passengers}=req.body;
    const {trip_id} = req.params;
    //console.log({passengers})

    try {   
        //Find the trip  
        const trip=await findTripById(trip_id);
        //console.log(trip)
        if(!trip){
            return res.status(404).json({message: 'Trip not found'})
        }
        const user_id = userId(req)
        const busNumber = trip.busNumber;
        const bookingDate = new Date;
        const numberOfSeats = passengers.length;
        const date = trip.date;
        const origin = trip.origin;
        const destination = trip.destination;
        const departureTime = trip.departureTime;
        const arrivalTime = trip.arrivalTime;
        const totalPrice = passengers.length * trip.fare;

    //    console.log(user_id,busNumber,bookingDate,origin,destination,date,departureTime,arrivalTime,numberOfSeats,totalPrice)

        // Check seat availability
        const tripId = trip_id.trim()
        const seatNumbers = passengers.map(passenger => passenger.seatNo);
        // console.log(seatNumbers)
        const seatExists = await checkSeatExist(tripId,seatNumbers);
        // console.log(seatExists)
        if (seatExists) {
            return res.status(400).json({ message: 'Seats already booked' });
        }
        // console.log(seatExists)
       
            //Create a new ticket
        const ticket = await bookTicket(
            user_id,
            tripId,
            busNumber,
            bookingDate,
            passengers,
            numberOfSeats,
            date,
            origin,
            destination,
            departureTime,
            arrivalTime,
            totalPrice
        );

        const updateTrip = await UpdateTrip(tripId, numberOfSeats, seatNumbers);
    
        if (!updateTrip) {
            return res.status(500).json({ message: 'Cannot to update trip' });
        }

         res.status(200).json({ 
            user_id: ticket.user_id,
            tripId: ticket.trip_id,
            busNumber: ticket.busNumber,
            bookingDate: ticket.bookingDate,
            passengers:ticket.passengers,
            numberOfSeats: ticket.numberOfSeats,
            date:ticket.date,
            origin: ticket.origin,
            destination: ticket.destination,
            departureTime: ticket.departureTime,
            arrivalTime: ticket.arrivalTime,
            totalPrice:ticket.totalPrice
        })
    }catch (error) {
        res.status(500).json({message:'Ticket not created'})
        console.log(error.message);
    }
}

const getTicketById = async(req,res)=>{
    try{    
        const ticket=await findTicketById(req.params.id)
        //console.log(ticket)
        if(ticket){
            return res.status(200).json(ticket);
            // console.log(ticket)
        }else{
            return res.status(404).json({message:'Ticket not found'})
        }
    }catch(error){
        res.status(500).json({message:'Ticket already exists'})
        console.log(error.message);
    }
}


const cancelTickets=async(req,res)=>{
    try{
        const ticket=await cancelTicket(req.params.id)
        //console.log(ticket)
        if(ticket){
            const seatNumbers=ticket.passengers
            const seatNo=seatNumbers.map(passenger=>passenger.seatNo);
            if(!ticket.isBooked){
                return res.status(404).json({
                    message: "Ticket Already canceled"
                })
            }

            const trip=await updatedTrip(ticket.trip_id,ticket.numberOfSeats,seatNo)
            
            if(!trip){
                return res.status(404).json({message:"Trip not found"})
            }
        ticket.isBooked = false
        await ticket.save();
        return res.status(200).json(ticket)
    } else {
        return res.status(404).json({message:"ticket not found"})
    }
}
    catch(error){
        res.status(500).json({message: "Invalid Ticket Id"})
        // console.error(error.message)
    }
}

const getAllTickets=async(req,res)=>{
    try {
        const user_id=userId(req)
        // console.log(user_id)
        const tickets=await getTickets(user_id)
        //console.log(tickets)
        if(tickets.length===0){
            return res.status(404).json({message:'Tickets not found'});
        }else{
            return res.status(200).json(tickets)
        }
    } catch (error) {
        res.status(500).json({message:'server error'})
    }

}

export{createTicket,getTicketById,cancelTickets,getAllTickets}