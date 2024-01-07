import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
    user_id :{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        rel:'User'
    },
    busNumber:{
        type:String,
        require:true,
        unique: true
    },
    busSeats:{
        type:Number,
        require:true,
    },
    isSeleeper:{
        type:Boolean,
        default:false,
    },
   
},
{timestamps:true}
);

const  Bus=mongoose.model("Bus",busSchema)

export default Bus