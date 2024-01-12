import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from "../utils/generateToken.js";
import User from '../model/userModel.js';


//@desc  Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user = await User.findOne({email})

    try{
        if(user&& (await user.matchPassword(password))){
            generateToken(res,user._id);

            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
            });
        }else{
            res.status(401).json({
                message: "Invalid email or password"
            })
        }
        }catch(err){
        res.status(400).json({error:err.message});
    }
});

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req,res)=>{
    const {name ,email,password }=req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(401).json({
            message: "User already exist"
        })
    }
    const user =await User.create({
        name,email,password
    });

    if(user){

        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    } else{
        res.status(401).json({
            message: "Invalid user data"
        })
    }
});

//@desc  Get user by Id
//@route Get /api/users/id
//@access Public

const getUserById = asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
        return res.json(user);
    }else{
        res.status(400).json({
            message: "Invalid user Id"
        })

    }
})



export{authUser,registerUser,getUserById}








// //@desc  Auth user & get token
// //@route POST /api/users/login
// //@access Public
// const loginUser = asyncHandler(async(req,res)=>{
//     res.send('auth user');
// });

// //@desc  Register
// //@route POST /api/users (create new user)
// //@access Public
// const registerUser = asyncHandler(async(req,res)=>{
//     res.send('register user');
// });

// //@desc  Bus create
// //@route POST /api/buses (create new bus)
// //@access private/admin
// const createBus = asyncHandler(async(req,res)=>{
//     res.send(' Bus create');
// });

// //@desc  Trip create
// //@route POST /api/trip (create new bus)
// //@access private/admin
// const createTrip = asyncHandler(async(req,res)=>{
//     res.send('Trip create');
// });

// //@desc  Trip Search
// //@route GET /api/bus 
// //@access public
// const searchBus = asyncHandler(async(req,res)=>{
//     res.send('Trip Search');
// });

// //@desc  Get Trip By id
// //@route GET /api/trip/id 
// //@access private/user
// const getTripbyId = asyncHandler(async(req,res)=>{
//     res.send('Get Trip By id');
// });

// //@desc  Book Ticket
// //@route POST /api/bookticket 
// //@access admin
// const bookTicket = asyncHandler(async(req,res)=>{
//     res.send('Book Ticket');
// });

// //@desc  Book Ticket by id
// //@route GET /api/bookticket/id
// //@access private/user
// const getTicketbyId = asyncHandler(async(req,res)=>{
//     res.send('Book Ticket by id');
// });

// //@desc  Get all Ticket
// //@route GET /api/bookticket
// //@access private
// const getallTicket = asyncHandler(async(req,res)=>{
//     res.send('Get all Ticket');
// });

// //@desc  Cancel Ticket
// //@route PUT /api/bookticket/id
// //@access private
// const cancelTicket = asyncHandler(async(req,res)=>{
//     res.send('Cancel Ticket');
// });

// //@desc  Get User by id
// //@route GET /api/users
// //@access private/admin
// const getUserbyId = asyncHandler(async(req,res)=>{
//     res.send('Get User by id');
// });

// export{loginUser,registerUser,searchBus,createBus,createTrip,getTripbyId,bookTicket,getUserbyId,getTicketbyId,getallTicket,cancelTicket}