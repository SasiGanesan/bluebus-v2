import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
   
    busNumber:{
        type: String,
        required: true
    },
    availableSeats:{
        type:Number,
        required:true,
    },
    bookedSeats:[{
        type:Number,
    }],
    origin:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    departureTime:{
        type:String,
        required:true,
    },
    arrivalTime:{
        type:String,
        required:true,
    },
    ratings:{
        type:Number,
    },
    fare:{
        type:Number,
        required:true,
    },
   
   
    
},
{timestamps:true}
)


const  Trip=mongoose.model("Trip",tripSchema)

export default Trip