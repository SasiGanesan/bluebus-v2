import Bus from '../model/busModel.js';

const busOwner=async(req,res,next)=>{
    try{
		const bus = await Bus.findOne({busNumber: req.body.busNumber});

		if(!bus) {
			res.status(404).json({message: "Bus not found"});
		} else {
			if (req.user && req.user._id.toString() === bus.user_id.toString()){
				next();
			} else {
				res.status(404).json({ message: "User can't add the bus"})
			}
		}
	} catch (error) {
        res.status(400).json({
            message: "error.message"
        })
}
}

export {busOwner}