import asyncHandler from '../middleware/asyncHandler.js';
import Bus from '../model/busModel.js';
import { userId } from "../middleware/authMiddleware.js";
//import { busOwner } from "../middleware/busMiddleware.js";

// create a new bus
const createBus = asyncHandler(async (req, res) => {
  try {
    const {busNumber, busSeats, isSleeper } = req.body;

    // Check busNumber 
    const existingBus = await Bus.findOne({ busNumber });
    if (existingBus) {
      return res.status(400).json({ message: 'This Bus number already exists' });
    }
    const user_id = userId(req)

    // Create a new bus
    const bus = await Bus.create({
      user_id,
      busNumber,
      busSeats,
      isSleeper,
    })
if(bus){
    res.status(201).json({
      user_id: bus.user_id,
      busNumber: bus.busNumber,
      busSeats: bus.busSeats,
      isSleeper: bus.isSleeper
  })
}
 
   // res.status(201).json({ message: 'Bus created successfully', bus: newBus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export { createBus }