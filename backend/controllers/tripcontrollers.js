import Trip from "../model/tripModel.js";
import {tripCreation,existsTrip,findTripById,tripSearching} from '../service/tripService.js'

//create trip
const createTrip = async(req,res)=>{
   
        const { busNumber,origin,destination,date,departureTime,arrivalTime,fare,availableSeats} = req.body;
        try{
        //check trip using busNumber and date
        const existingTrip = await existsTrip({busNumber, date});
        if(existingTrip){
            return res.status(400).json({message: 'This trip already exists'});
        }
        //Create a new trip
        const trip=await tripCreation(
            busNumber,
            origin,
            destination,
            date,
            departureTime,
            arrivalTime,  
            fare,
            availableSeats,
           )
           return res.status(201).json({
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
        // console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        // console.log(error)
      }
}


const searchBus = async(req,res)=>{
    try {
        let origin = req.query.from;
        //console.log(origin)
        let destination=req.query.to;
        //console.log(destination)
        let date=req.query.date;
    //    console.log(date)
    
    const trips=await tripSearching(
             origin,
             destination,
             date
        )
        // console.log(trips);
        if(!trips.length){
            return res.status(404).json({message: "No available bus"})
        }else{
            return res.status(200).json(trips)
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
   
}

//Get Trip by id
const getTripById =async(req,res)=>{
    try {
        const trip=await findTripById(req.params.id)
        if(trip){       
          res.status(200).json(trip);
        }else{
            res.status(404).json({
                message: "Trip not found"
            })
        }
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Invalid Trip Id' });
    } 
}


export { createTrip,searchBus,getTripById}
