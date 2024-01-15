//import asyncHandler from "../middleware/asyncHandler.js";
import Ticket from "../model/ticketModel.js";
import Trip from "../model/tripModel.js";
import mongoose from "mongoose";

// const {trip_id} = req.params;
// const idString=trip_id
// const id=new mongoose.Types.ObjectId(idString.trim());

const findTripById=async(_id)=>{
    const tripId=_id.trim()
    const trip=await Trip.findById(tripId);
    console.log(_id)
    console.log("ID",{trip})
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
            departureTime,
            arrivalTime,
            origin,
            destination,
            totalPrice, 
        });
        return ticket;
      };

      // Check seat availability
    //   const seatNumbers = passengers.map(passenger => passenger.seatNumber);
    const checkSeatExist=async(trip_id,seatNumbers)=>{
        const seatExists = await Ticket.findOne({ _id:trip_id, bookSeats: { $in: seatNumbers } });
   
        return seatExists
    }
    const UpdateTrip = async (trip_id, numberOfSeats, seatNumbers) => {
        const updatedTrip = await Trip.findOneAndUpdate(
            { _id: trip_id },
            { $inc: { availableSeats: -numberOfSeats }, $push: { seatNumber: seatNumbers } },
            { new: true }
          );
          return updatedTrip
    }

export {findTripById,bookTicket,checkSeatExist,UpdateTrip}