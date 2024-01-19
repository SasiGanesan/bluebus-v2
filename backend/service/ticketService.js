//import { getTicketById } from "../controllers/ticketController.js";
import Ticket from "../model/ticketModel.js";
import Trip from "../model/tripModel.js";

const findTripById=async(trip_id)=>{
    const tripId=trip_id.trim()
    //console.log(trip_id)
    const trip=await Trip.findById(tripId);
    //console.log("ID",trip)
    return trip;
};

const bookTicket=async(
        user_id,
        trip_id,
        busNumber,
        bookingDate,
        passengers,
        numberOfSeats,
        date,
        origin,
        destination,
        departureTime,
        arrivalTime,
        totalPrice,
        )=>{

        const ticket= await Ticket.create({
            user_id,
            trip_id,
            busNumber,
            bookingDate,
            passengers,
            numberOfSeats,
            date,
            origin,
            destination,
            departureTime,
            arrivalTime,
            totalPrice, 
        } );
        return ticket;
      };

     
    const checkSeatExist = async (trip_id,seatNumbers)=>{
        //console.log(trip_id,seatNumbers)
        const seatExists = await Trip.findOne({ _id: trip_id, bookedSeats: { $in: seatNumbers } });
        //console.log(seatExists)
        return seatExists
    }
    const UpdateTrip = async (trip_id, numberOfSeats, seatNumbers) => {
        const updatedTrip = await Trip.findOneAndUpdate(
            { _id: trip_id },
            { $inc: { availableSeats: -numberOfSeats }, $push: { bookedSeats: seatNumbers } },
            { new: true }
          );
          //console.log(updatedTrip)
          return updatedTrip
    }

    //method - get
    const findTicketById=async(id)=>{
        const TicketId=id.trim()
        //console.log(id)
        const ticket= await Ticket.findById(TicketId);
        //console.log(ticket)
        return ticket
    }


    
    //cancel ticket
    //method - PUT
    const cancelTicket = async(id)=>{
        const ticket = await Ticket.findById(id.trim());
        //console.log(ticket)
        return ticket
    }

    const updatedTrip = async (trip_id,numberOfSeats,seatNumbers)=>{
        const trip=await Trip.findOneAndUpdate(
            {_id: trip_id},
            {$inc: {availableSeats:numberOfSeats},$pull:{bookedSeats: {$in:seatNumbers}}},
            {new: true}
            );
            return trip
    }

    const getTickets=async(id)=>{
        const tickets=await Ticket.find({user_id:id});
        return tickets
    }

export {findTripById,bookTicket,checkSeatExist,UpdateTrip,findTicketById,cancelTicket,updatedTrip,getTickets}