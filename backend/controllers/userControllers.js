import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from "../utils/generateToken.js";
import User from '../model/userModel.js';


//@desc  Auth user & get token
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user = await User(email, password)

    try{
        if(user){
            generateToken(res,user._id);

            res.status(200).json({
                _id:user._id,
                name:user.email,
                email:user.email,
                isAdmin:user.isAdmin,
            });
        }else{
            res.status(401).json({
                message: "Invaild email or password"
            })
        }
        }catch(err){
        res.status(400).json({error:err.message});
    }
});

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    if(!name || !email || !password){
        res.status(400).json({ message: "Invaild user data"})
    }
    try {
        const userExists = await checkUser(email)

        if (userExists){
            return await res.status(400).json({
                message : "User already Exists"
            })
        }
        const user = await createUser(name, email, password, isAdmin);

            generateToken(res, user._id)

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }

    
});
export{loginUser,registerUser}








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