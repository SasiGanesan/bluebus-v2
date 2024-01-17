import mongoose from "mongoose";

const passengerSchema = mongoose.Schema({
    name:{
        type:String,
    },
    age:{
        type:String,
    },
    seatNo:{
        type:Number,
    },
})

const ticketSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
        trip_id:{
            type:String,
            required:true,
            ref:"Trip",
        },
        busNumber: {
            type: String,
            required: true,
            rel: "Bus"
        },
        bookingDate: {
            type: String,
            required: true
        },
        passengers:[passengerSchema],
        numberOfSeats:{
            type:Number,
            required:true,
        },
        date:{
            type:Date,
            required:true
        },
        origin:{
            type:String,
            required:true
        },
        destination:{
            type:String,
            required:true
        },
        departureTime:{
            type:String,
            required:true
        },
        arrivalTime:{
            type:String,
            required:true
        },
        isBooked:{
            type:Boolean,
            default:true,
        },
        totalPrice:{
            type:Number,
            required:true
        }
},{
    timestamps:true
})

const Ticket = mongoose.model("Ticket",ticketSchema);

export default Ticket;