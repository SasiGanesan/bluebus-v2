import Trip from "../model/tripModel.js";

const existsTrip=async(busNumber,date)=>{
    const trip=await Trip.findOne(busNumber, date)
    if(trip){
    return trip
     }
     return null
}
const tripCreation=async(busNumber,origin,destination,date,departureTime,arrivalTime,fare,availableSeats)=>{
    const trip=await Trip.create({
        busNumber,
        origin,
        destination,
        date,
        departureTime,
        arrivalTime,  
        fare,
        availableSeats,
       
    });
    return trip
};

const findTripById = async(trip_id)=>{
    const trip=await Trip.findById(trip_id)
    return trip
}

const tripSearching=async(origin,destination,date)=>{
    const trip=await Trip.find({
        origin:{$regex: origin, $options: 'i'},
        destination: {$regex:destination, $options: 'i'},
        date:date
    })
    return trip
}

export {tripCreation,existsTrip,findTripById,tripSearching}


