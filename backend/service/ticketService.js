import Ticket from "../model/ticketModel.js";
import Trip from "../model/tripModel.js";

const findTripById=async(trip_id)=>{
   // const tripId=trip_id.trim()
    const trip=await Trip.findById(trip_id);
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
        console.log(seatExists)
        return seatExists
    }
    const UpdateTrip = async (trip_id, numberOfSeats, seatNumbers) => {
        const updatedTrip = await Trip.findOneAndUpdate(
            { _id: trip_id },
            { $inc: { availableSeats: -numberOfSeats }, $push: { bookedSeats: seatNumbers } },
            { new: true }
          );
          return updatedTrip
    }

    const findTicketById=async(id)=>{
        const ticket= await Ticket.findById(id);
        return ticket
    }

export {findTripById,bookTicket,checkSeatExist,UpdateTrip,findTicketById}