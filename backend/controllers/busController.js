// import { userId } from "../middleware/authMiddleware.js";
import { BusCreation,existsBus } from '../service/busService.js';

// create a new bus
const createBus = async (req, res) => {
  try {
    const {busNumber, busSeats, isSleeper } = req.body;
    // console.log(busNumber, busSeats, isSleeper)

    // Check busNumber 
    const existingBus = await existsBus({ busNumber });
    if (existingBus) {
      return res.status(400).json({ message: 'This Bus number already exists' });
    }
    const user_id = req.user_id

    // Create a new bus
    const bus = await BusCreation(
      user_id,
      busNumber,
      busSeats,
      isSleeper,
    )
if(bus){
    res.status(201).json({
      user_id: bus.user_id,
      busNumber: bus.busNumber,
      busSeats: bus.busSeats,
      isSleeper: bus.isSleeper
  });
}
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
    // console.log(error)
  }
};

export { createBus }