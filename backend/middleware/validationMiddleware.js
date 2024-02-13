import Joi from 'joi';

//User register Validation
const registerValidation=async(req,res,next)=>{
    const registerSchema = Joi.object ({
       name: Joi.string().required(),
       email: Joi.string().email().trim().required(),
       password: Joi.string().required(),
       confirmPassword:Joi.string().required(),
       isAdmin:Joi.boolean().required()
    });
    const {error} = await registerSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.message
        })
    }else{
        next();
    }
};



//User Login validation
const loginValidation = async(req,res,next)=>{
    const loginSchema = Joi.object({
        email: Joi.string().email().trim().required(),
        password: Joi.string().required(),
    });
    const {error} = await loginSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.message
        })
    }else{
        next();
    }
};

//create Bus validation
const createBusValidation = async(req,res,next)=>{
    const createBusSchema = Joi.object({
        busNumber:Joi.string().alphanum().required(),
        busSeats:Joi.number().required(),
        isSleeper:Joi.boolean(),
    });
    const {error} = await createBusSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: "validation Error"
        })
    }else{
        next();
    }
};

//Trip validation
const tripValidation=async(req,res,next)=>{
   const tripSchema=Joi.object({
        busNumber:Joi.string().alphanum().required(),
        origin: Joi.string().required(),
        destination:Joi.string().required(),
        date: Joi.date().required(),
        departureTime: Joi.string().required(),
        arrivalTime: Joi.string().required(),
        fare: Joi.number().required(),
        availableSeats:Joi.number().required()
    });
    const {error} = await tripSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.message
        })
    }else{
        next();
    }
}

//Ticket Validation

const ticketValidation=async(req,res,next)=>{
    const ticketSchema=Joi.object({
        passengers: Joi.array().items(
            Joi.object({
                name: Joi.string().required(),
                age: Joi.number().required(),
                seatNo: Joi.number().required(),
            })
        ).required(),
    });
    const {error} = await ticketSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.message
        })
    }else{
        next();
    }
};


//Search Bus

const searchBusValidation=async(req,res,next)=>{
    const searchBusSchema=Joi.object({
        from: Joi.string().required(),
        to : Joi.string().required(),
        date: Joi.date().required(),
    });
    const {error} = await searchBusSchema.validate(req.query);
    if(error){
        return res.status(400).json({
            message: error.message
        })
    }else{
        next();
    }
}

export {registerValidation,loginValidation,createBusValidation,tripValidation,ticketValidation,searchBusValidation }