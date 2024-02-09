import Bus from "../model/busModel.js";

const BusCreation=async(user_id,busNumber, busSeats, isSleeper)=>{
    const bus=await Bus.create({
        user_id, busNumber,busSeats,isSleeper,
    });
    // console.log(bus)
    return bus;
}

const existsBus=async(busNumber)=>{
    const bus=await Bus.findOne(busNumber);
    if(bus)
    return bus
}

export {BusCreation,existsBus}