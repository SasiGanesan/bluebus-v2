import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    busNumber:{
        type: String,
        require: true
    },
    origin:{
        type:String,
        require:true,
    },
    destination:{
        type:String,
        require:true,
    },
    departure:{
        type:Date,
        require:true,
    },
    arrival:{
        type:Date,
        require:true,
    },
    ratings:{
        type:Number,
        require:true,
    },
    fare:{
        type:Number,
        require:true,
    },
    availableSeats:{
        type:Number,
        require:true,
    },
    bookedSeats:{
        type:Number,
    },
    date:{
        type:Date,
        require:true,
    },

},
{timestamps:true}
)


const  Trip=mongoose.model("Trip",tripSchema)

export default Trip